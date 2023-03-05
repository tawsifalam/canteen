import { Category } from 'src/categories/entities/category.entity';
import { Tax } from 'src/taxes/entities/tax.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  track_stock: boolean;

  @Column()
  sold_by_weight: boolean;

  @Column()
  is_composite: boolean;

  @Column()
  sku: number;

  @Column()
  image: string;

  @Column()
  qty_in_stock: number;

  @Column()
  price: number;

  @OneToOne(() => Category)
  @JoinColumn()
  category: Category;

  @OneToOne(() => Tax)
  @JoinColumn()
  tax: Tax;
}
