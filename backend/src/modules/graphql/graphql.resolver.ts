import { Resolver, Query, Args } from '@nestjs/graphql';
import {
  MetadataService,
  DatabaseType,
} from '../../common/services/metadata.service';

@Resolver()
export class GraphqlResolver {
  constructor(private metadataService: MetadataService) {}

  @Query(() => String)
  async getMetadata(
    @Args('db', { nullable: true }) db?: DatabaseType,
    @Args('cache', { nullable: true }) cache?: boolean,
  ): Promise<string> {
    const dbType = db || DatabaseType.POSTGRESQL;
    const useCache = cache !== false;

    const data = await this.metadataService.getVersionData(
      'GraphQL',
      dbType,
      useCache,
    );
    return JSON.stringify(data);
  }
}
