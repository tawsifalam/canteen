import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { OrderLine } from './order-line.entity';
export enum ReceiptTypeEnum {
  SALE = 'SALE',
  REFUND = 'REFUND',
}

export enum DiningOptionsEnum {
  DINE_IN = 'DINE_IN',
  TAKE_OUT = 'TAKE_OUT',
  DELIVERY = 'DELIVERY',
}

@Entity()
@Unique(['serial'])
export class Receipt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('increment')
  serial: number;

  @Column({ nullable: true })
  note: string;

  @Column({
    type: 'enum',
    enum: ReceiptTypeEnum,
    default: ReceiptTypeEnum.SALE,
  })
  receipt_type: ReceiptTypeEnum;

  @Column({ nullable: true })
  refund_for: string;

  @OneToMany(() => OrderLine, (orderLine) => orderLine.receipt, {
    cascade: true,
    eager: true,
  })
  order_lines: OrderLine[];

  @Column({ default: 'CASH' })
  payment_method: string;

  @Column({ nullable: true })
  cash_received: number;

  @Column({ nullable: true })
  cash_returned: number;

  @Column()
  total_money: number;

  @Column({ nullable: true })
  total_taxes: number;

  @Column({ nullable: true })
  total_discounts: number;

  @Column({
    type: 'enum',
    enum: DiningOptionsEnum,
    default: DiningOptionsEnum.DINE_IN,
  })
  dining_option: DiningOptionsEnum;

  @Column({ type: 'timestamp' })
  receipt_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  cancelled_date: Date;
}
