import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Component {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  qty: number;

  @ManyToOne(() => Product, (product) => product.components)
  product: Product;
}
