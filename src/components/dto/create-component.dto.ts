import { IsNumber } from 'class-validator';

export class CreateComponentDto {
  @IsNumber()
  qty: number;
}
