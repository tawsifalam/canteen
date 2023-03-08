import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderLine } from './order_line.entity';
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
export class Receipt {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  note: string;

  @Column({
    type: 'enum',
    enum: ReceiptTypeEnum.SALE,
    default: ReceiptTypeEnum.SALE,
  })
  receipt_type: ReceiptTypeEnum;

  @Column()
  refund_for: string;

  @OneToMany(() => OrderLine, (orderLine) => orderLine.receipt)
  order_lines: OrderLine[];

  @Column()
  payment_method: string;

  @Column()
  cash_received: number;

  @Column()
  cash_returned: number;

  @Column()
  total_money: number;

  @Column()
  total_taxes: number;

  @Column()
  total_discounts: number;

  @Column({
    type: 'enum',
    enum: DiningOptionsEnum,
    default: DiningOptionsEnum.DINE_IN,
  })
  dining_option: DiningOptionsEnum;

  @Column({ type: 'timestamp' })
  receipt_date: Date;

  @Column({ type: 'timestamp' })
  cancelled_date: Date;
}
