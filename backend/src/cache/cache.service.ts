import { Injectable, Logger, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.logger.log('Cache Service initialized with NestJS Cache Manager');
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.cacheManager.get<T>(key);
      if (value !== undefined) {
        this.logger.debug(`Cache HIT for key: ${key}`);
        return value;
      }
      this.logger.debug(`Cache MISS for key: ${key}`);
      return null;
    } catch (error) {
      this.logger.error(`Error getting key ${key}:`, error);
      return null;
    }
  }

  async set(key: string, value: unknown, ttl?: number): Promise<boolean> {
    try {
      if (ttl) {
        await this.cacheManager.set(key, value, ttl * 1000); // cache-manager usa ms
      } else {
        await this.cacheManager.set(key, value);
      }
      this.logger.debug(`Cache SET for key: ${key}, TTL: ${ttl || 'default'}`);
      return true;
    } catch (error) {
      this.logger.error(`Error setting key ${key}:`, error);
      return false;
    }
  }

  async del(key: string): Promise<boolean> {
    try {
      await this.cacheManager.del(key);
      this.logger.debug(`Cache DELETE for key: ${key}`);
      return true;
    } catch (error) {
      this.logger.error(`Error deleting key ${key}:`, error);
      return false;
    }
  }

  async wrap<T>(key: string, fn: () => Promise<T>, ttl?: number): Promise<T> {
    try {
      if (ttl) {
        return await this.cacheManager.wrap(key, fn, ttl * 1000);
      }
      return await this.cacheManager.wrap(key, fn);
    } catch (error) {
      this.logger.error(`Error wrapping key ${key}:`, error);
      // Fallback: execute function directly if cache fails
      return await fn();
    }
  }

  // Métodos de conveniência
  async remember<T>(
    key: string,
    factory: () => Promise<T>,
    ttl = 300,
  ): Promise<T> {
    return this.wrap(key, factory, ttl);
  }

  async forget(key: string): Promise<boolean> {
    return this.del(key);
  }

  // Método para verificar se existe
  async exists(key: string): Promise<boolean> {
    try {
      const value = await this.cacheManager.get(key);
      return value !== undefined;
    } catch (error) {
      this.logger.error(`Error checking existence of key ${key}:`, error);
      return false;
    }
  }
}
