import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MetadataResponse } from '../models/metadata.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // REST API call
  getRestMetadata(): Observable<MetadataResponse> {
    return this.http.get<MetadataResponse>(`${this.baseUrl}/rest/meta`);
  }

  // Microservice call
  getMicroMetadata(): Observable<MetadataResponse> {
    return this.http.get<MetadataResponse>(`${this.baseUrl}/micro/meta`);
  }

  // gRPC call (simulado via HTTP)
  getGrpcMetadata(): Observable<MetadataResponse> {
    return this.http.get<MetadataResponse>(`${this.baseUrl}/grpc/meta`);
  }
}