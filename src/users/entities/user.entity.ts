import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ required: true, example: 'TestUser' })
  @Column()
  login: string;

  @ApiProperty({ required: true, description: 'user password' })
  @Exclude()
  @Column()
  password: string;

  @ApiProperty({ required: true, example: 1 })
  @Column()
  version: number;

  @ApiProperty({ required: true, example: '2023-10-14T11:57:42.400Z' })
  @Column({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ required: true, example: '2023-10-14T11:57:42.400Z' })
  @Column({ type: 'timestamp' })
  updatedAt: Date;
}
