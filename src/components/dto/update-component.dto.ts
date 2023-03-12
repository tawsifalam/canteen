import { IsNumber } from 'class-validator';

export class UpdateComponentDto {
  @IsNumber()
  qty: number;
}
