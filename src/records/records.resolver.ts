import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveReference,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { RecordsService } from './records.service';
import { CreateRecordInput } from './dto/create-record.input';
import { UpdateRecordInput } from './dto/update-record.input';
import { ServiceRecord } from 'src/entities/records-service.entity';
import { PaginatedServiceRecords } from './dto/paginated-result.dto';
import { Vehicle } from 'src/stubs/vehicle.stub';

@Resolver(() => ServiceRecord)
export class RecordsResolver {
  constructor(private readonly recordsService: RecordsService) {}

  @Mutation(() => ServiceRecord)
  createRecord(
    @Args('createRecordInput') createRecordInput: CreateRecordInput,
  ) {
    return this.recordsService.create(createRecordInput);
  }

  @Query(() => [PaginatedServiceRecords], { name: 'serviceRecords' })
  findAll(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 100 }) limit: number,
  ): Promise<PaginatedServiceRecords> {
    return this.recordsService.findAll(page, limit);
  }

  @Query(() => [ServiceRecord], { name: 'serviceRecordsByVin' })
  findByVin(@Args('vin') vin: string) {
    return this.recordsService.findByVin(vin);
  }

  @Query(() => ServiceRecord, { name: 'serviceRecord' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.recordsService.findOne(id);
  }

  @Mutation(() => ServiceRecord)
  updateRecord(
    @Args('id', { type: () => String }) id: string,
    @Args('updateRecordInput') updateRecordInput: UpdateRecordInput,
  ) {
    return this.recordsService.update(id, updateRecordInput);
  }

  @Mutation(() => ServiceRecord)
  removeRecord(@Args('id', { type: () => String }) id: string) {
    return this.recordsService.remove(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.recordsService.findOne(reference.id);
  }

  @ResolveField(() => Vehicle)
  vehicle(@Parent() serviceRecord: ServiceRecord) {
    return { __typename: 'Vehicle', vin: serviceRecord.vin };
  }
}
