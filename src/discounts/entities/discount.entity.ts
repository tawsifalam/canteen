import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum DiscountTypeEnum {
  FIXED_PERCENT = 'FIXED_PERCENT',
  FIXED_AMOUNT = 'FIXED_AMOUNT',
  VARIABLE_PERCENT = 'VARIABLE_PERCENT',
  VARIABLE_AMOUNT = 'VARIABLE_AMOUNT',
  DISCOUNT_BY_POINT = 'DISCOUNT_BY_POINT',
}

@Entity()
export class Discount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  discount_amount: number;

  @Column()
  discount_percent: number;

  @Column({
    type: 'enum',
    enum: DiscountTypeEnum,
    default: DiscountTypeEnum.FIXED_PERCENT,
  })
  discount_type: DiscountTypeEnum;
}
