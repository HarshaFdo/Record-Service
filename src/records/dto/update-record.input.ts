import { CreateRecordInput } from './create-record.input';
import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';

@InputType()
export class UpdateRecordInput extends PartialType(CreateRecordInput) {
  @Field(() => Float, { nullable: true })
  cost?: number;

  @Field({ nullable: true })
  service_date?: Date;
}
