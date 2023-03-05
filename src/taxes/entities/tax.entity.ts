import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum TaxTypeEnum {
  INCLUDED = 'INCLUDED',
  ADDED = 'ADDED',
}

@Entity()
export class Tax {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  rate: number;

  @Column({
    type: 'enum',
    enum: TaxTypeEnum,
    default: TaxTypeEnum.ADDED,
  })
  tax_type: TaxTypeEnum;
}
