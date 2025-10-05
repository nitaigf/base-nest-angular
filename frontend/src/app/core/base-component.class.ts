import { signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MetadataResponse, ServiceConfig } from './models/metadata.model';
import { GlobalsService } from './services/globals.service';
import { BackendService } from './services/backend.service';

export abstract class BaseComponentClass {
  configForm: FormGroup;
  result = signal<MetadataResponse | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  isOnline = signal(typeof navigator !== 'undefined' ? navigator.onLine : true);

  protected fb!: FormBuilder;
  protected backendService!: BackendService;

  constructor(fb: FormBuilder, backendService: BackendService) {
    this.fb = fb;
    this.backendService = backendService;
    this.configForm = this.fb.group({
      database: ['postgresql'],
      cache: [true],
      method: ['REST']
    });
  }

  processRequest(): void {
    if (this.configForm.invalid || !this.isOnline()) return;

    const formValue = this.configForm.value;
    const config: ServiceConfig = {
      database: formValue.database,
      cache: formValue.cache,
      method: formValue.method
    };

    this.loading.set(true);
    this.error.set(null);
    this.result.set(null);

    this.backendService.callEndpoint(config).subscribe({
      next: (response) => {
        this.result.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'Erro ao processar requisição');
        this.loading.set(false);
        console.error('Erro:', err);
      }
    });
  }

  getConfigDescription(): string {
    const values = this.configForm.value;
    const dbLabel = this.databaseOptions.find(opt => opt.value === values.database)?.label;
    const cacheLabel = this.cacheOptions.find(opt => opt.value === values.cache)?.label;
    const methodLabel = this.methodOptions.find(opt => opt.value === values.method)?.label;
    
    return `${methodLabel} - ${dbLabel} ${cacheLabel}`;
  }

  get methodOptions() {
    return GlobalsService.methodOptions
  }

  get cacheOptions() {
    return GlobalsService.cacheOptions
  }

  get databaseOptions() {
    return GlobalsService.databaseOptions
  }
}