import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Vehicle } from '../stubs/vehicle.stub';
import { ServiceRecord } from '../entities/records-service.entity';
import { RecordsService } from './records.service';
import { Logger } from '@nestjs/common/services/logger.service';

@Resolver(() => Vehicle)
export class VehicleFieldsResolver {
  private readonly logger = new Logger(VehicleFieldsResolver.name);

  constructor(private readonly recordsService: RecordsService) {}

  @ResolveField(() => [ServiceRecord])
  async serviceRecords(@Parent() vehicle: Vehicle): Promise<ServiceRecord[]> {
    this.logger.log('Record Service: Federation request received');
    this.logger.log('Fetching service records for VIN:', vehicle.vin);
    const records=await this.recordsService.findByVin(vehicle.vin);

    this.logger.log(`Found ${records.length} service records`);
    this.logger.log('Service records sent to gateway');

    return records;
  }
}