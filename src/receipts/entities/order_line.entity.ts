import { Discount } from 'src/discounts/entities/discount.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Receipt } from './receipt.entity';

@Entity()
export class OrderLine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;

  @Column()
  qty: number;

  @Column()
  price: number;

  @ManyToOne(() => Receipt, (receipt) => receipt.order_lines)
  receipt: Receipt;

  @OneToOne(() => Discount)
  @JoinColumn()
  discount: Discount;
}
