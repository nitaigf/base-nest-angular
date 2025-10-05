import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MetadataResponse, RequestConfig, ServiceConfig } from '../models/metadata.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  callREST(config: RequestConfig): Observable<MetadataResponse> {
    const params = new URLSearchParams();
    params.set('db', config.database);
    params.set('cache', config.cache.toString());

    return this.http.get<MetadataResponse>(`${this.apiUrl}/rest/meta?${params.toString()}`);
  }

  callGraphQL(config: RequestConfig): Observable<MetadataResponse> {
    const query = {
      query: `query GetMetadata($db: String, $cache: Boolean) { 
        getMetadata(db: $db, cache: $cache) 
      }`,
      variables: {
        db: config.database,
        cache: config.cache
      }
    };

    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/graphql`, query).subscribe({
        next: (response) => {
          try {
            const data = JSON.parse(response.data.getMetadata);
            observer.next(data);
            observer.complete();
          } catch (error) {
            observer.error(error);
          }
        },
        error: (err) => observer.error(err)
      });
    });
  }

  callMicroservice(config: RequestConfig): Observable<MetadataResponse> {
    const params = new URLSearchParams();
    params.set('db', config.database);
    params.set('cache', config.cache.toString());

    return this.http.get<MetadataResponse>(`${this.apiUrl}/micro/meta?${params.toString()}`);
  }

  callGrpc(config: RequestConfig): Observable<MetadataResponse> {
    const params = new URLSearchParams();
    params.set('db', config.database);
    params.set('cache', config.cache.toString());

    return this.http.get<MetadataResponse>(`${this.apiUrl}/grpc/meta?${params.toString()}`);
  }

  // WebSocket será implementado posteriormente se necessário
  callWebSocket(config: RequestConfig): Observable<MetadataResponse> {
    return new Observable(observer => {
      observer.error(new Error('WebSocket não implementado nesta interface'));
    });
  }

  // Método genérico para chamar qualquer endpoint
  callEndpoint(serviceConfig: ServiceConfig): Observable<MetadataResponse> {
    switch (serviceConfig.method) {
      case 'REST':
        return this.callREST(serviceConfig);
      case 'GraphQL':
        return this.callGraphQL(serviceConfig);
      case 'Microservice':
        return this.callMicroservice(serviceConfig);
      case 'gRPC':
        return this.callGrpc(serviceConfig);
      case 'WebSocket':
        return this.callWebSocket(serviceConfig);
      default:
        return new Observable(observer => {
          observer.error(new Error(`Método ${serviceConfig.method} não suportado`));
        });
    }
  }
}