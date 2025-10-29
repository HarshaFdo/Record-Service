import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Vehicle } from '../stubs/vehicle.stub';
import { ServiceRecord } from '../entities/records-service.entity';
import { RecordsService } from './records.service';

@Resolver(() => Vehicle)
export class VehicleFieldsResolver {
  constructor(private readonly recordsService: RecordsService) {}

  @ResolveField(() => [ServiceRecord])
  async serviceRecords(@Parent() vehicle: Vehicle): Promise<ServiceRecord[]> {
    console.log('Resolving serviceRecords for VIN:', vehicle.vin);
    return this.recordsService.findByVin(vehicle.vin);
  }
}