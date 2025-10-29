import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "vin")')
@Directive('@extends')
export class Vehicle {
  @Field()
  @Directive('@external')
  vin: string;

}