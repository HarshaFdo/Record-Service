import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateRecordInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  vin: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  service_type: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field(() => Float)
  @IsNumber()
  cost: number;

  @Field()
  @IsDate()
  service_date: Date;

  @Field()
  @IsString()
  @IsNotEmpty()
  mechanic_name: string;
}
