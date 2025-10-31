import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Vehicle } from '../stubs/vehicle.stub';
import { ServiceRecord } from '../entities/records-service.entity';
import { RecordsService } from './records.service';

@Resolver(() => Vehicle)
export class VehicleFieldsResolver {
  constructor(private readonly recordsService: RecordsService) {}

  @ResolveField(() => [ServiceRecord])
  async serviceRecords(@Parent() vehicle: Vehicle): Promise<ServiceRecord[]> {
    console.log('Record Service: Federation request received');
    console.log('Fetching service records for VIN:', vehicle.vin);
    const records=await this.recordsService.findByVin(vehicle.vin);

    console.log(`Found ${records.length} service records`);
    console.log('Service records sent to gateway');

    return records;
  }
}