import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Receipt } from './receipt.entity';

@Entity()
export class OrderLine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productName: string;

  @Column()
  productDescription: string;

  @Column()
  productPrice: number;

  @Column()
  qty: number;

  @Column()
  price: number;

  @Column()
  discountInAmount: number;

  @Column()
  discountInPercent: number;

  @Column()
  taxInAmount: number;

  @Column()
  taxInPercent: number;

  @ManyToOne(() => Receipt, (receipt) => receipt.order_lines)
  receipt: Receipt;
}
