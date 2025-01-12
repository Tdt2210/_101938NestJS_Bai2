import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../users/entities/product.entity';
import { Category } from '../users/entities/category.entity';

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  @Query(() => [Product])
  async getProducts(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category'] });
  }

  @Query(() => Product, { nullable: true })
  async getProductById(@Args('id') id: number): Promise<Product | null> {
    return this.productRepository.findOne({ where: { id }, relations: ['category'] });
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('description') description: string,
    @Args('categoryId') categoryId: number,
  ): Promise<Product> {
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) throw new Error('Category not found');
    const product = this.productRepository.create({ name, price, description, category });
    return this.productRepository.save(product);
  }
}
