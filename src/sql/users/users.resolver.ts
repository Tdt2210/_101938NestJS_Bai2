import { Resolver, Query } from '@nestjs/graphql';

@Resolver('User')
export class UserResolver {
  @Query((returns) => String)
  async users(): Promise<string> {
    return 'hello GralpQL';
  }
}
