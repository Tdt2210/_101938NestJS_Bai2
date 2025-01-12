import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../users/entities/category.entity';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  @Query(() => [Category])
  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['products'] });
  }

  @Mutation(() => Category)
  async createCategory(@Args('name') name: string): Promise<Category> {
    const category = this.categoryRepository.create({ name });
    return this.categoryRepository.save(category);
  }
}
