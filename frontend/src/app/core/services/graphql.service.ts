import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const GET_METADATA = gql`
  query GetMetadata {
    getMetadata
  }
`;

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  getMetadata(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: GET_METADATA,
      })
      .valueChanges.pipe(
        map((result: any) => {
          try {
            return JSON.parse(result.data.getMetadata);
          } catch {
            return result.data.getMetadata;
          }
        })
      );
  }
}