import { Directive, Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Vehicle } from 'src/stubs/vehicle.stub';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Directive('@key(fields:"id")')
@Entity('service_records')
export class ServiceRecord {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  vin: string; // Links to vehicle

  @Field()
  @Column()
  service_type: string; // "Oil change", "Tire Rotaion", "Brake service"

  @Field()
  @Column('text')
  description: string;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  cost: number;

  @Field()
  @Column({ type: 'date' })
  service_date: Date;

  @Field()
  @Column()
  mechanic_name: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @Field(() => Vehicle, { nullable: true })
  vehicle?: Vehicle;
}
