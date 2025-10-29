import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ServiceRecord } from "src/entities/records-service.entity";


@ObjectType()
export class PaginatedServiceRecords {
  @Field(()=>[ServiceRecord])
  data: ServiceRecord[];

  @Field(() => Int)
  total: number;

  @Field(() => Int) 
  page: number;

  @Field(() => Int)
  totalPages: number;
}
