import { Category } from 'src/categories/entities/category.entity';
import { Component } from 'src/components/entities/component.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  track_stock: boolean;

  @Column({ default: false })
  sold_by_weight: boolean;

  @Column({ default: false })
  is_composite: boolean;

  @Column({ unique: true })
  sku: number;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  qty_in_stock: number;

  @Column()
  price: number;

  @Column()
  cost: number;

  @OneToOne(() => Category, { eager: true })
  @JoinColumn()
  category: Category;

  @OneToMany(() => Component, (component) => component.product, {
    eager: true,
    cascade: true,
  })
  components: Component[];
}
