import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Receipt } from './receipt.entity';

@Entity()
export class OrderLine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_name: string;

  @Column({ nullable: true })
  product_description: string;

  @Column()
  product_price: number;

  @Column()
  qty: number;

  @Column()
  total_price: number;

  @Column({ nullable: true })
  discount_in_amount: number;

  @Column({ nullable: true })
  discount_in_percent: number;

  @Column({ nullable: true })
  tax_in_amount: number;

  @Column({ nullable: true })
  tax_in_percent: number;

  @ManyToOne(() => Receipt, (receipt) => receipt.order_lines)
  receipt: Receipt;
}
