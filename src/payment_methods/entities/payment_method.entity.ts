import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum PaymentTypeEnum {
  CASH = 'CASH',
  CARD = 'CARD',
}

@Entity()
export class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'json' })
  description: Record<string, any>;

  @Column({
    type: 'enum',
    enum: PaymentTypeEnum,
    default: PaymentTypeEnum.CASH,
  })
  payment_type: PaymentTypeEnum;
}
