import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  public static databaseOptions = [
    { value: 'postgresql', label: 'PostgreSQL' },
    { value: 'mongodb', label: 'MongoDB' }
  ];
  
  public static cacheOptions = [
    { value: true, label: 'Com Cache' },
    { value: false, label: 'Sem Cache' }
  ];

  public static methodOptions = [
    { value: 'REST', label: 'REST API' },
    { value: 'GraphQL', label: 'GraphQL' },
    { value: 'Microservice', label: 'Microservice' },
    { value: 'gRPC', label: 'gRPC' }
  ];
}