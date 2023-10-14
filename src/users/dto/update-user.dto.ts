import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: true, description: 'Old password' })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({ required: true, description: 'New password' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, {
    message: 'Password cannot consist of whitespace only',
  })
  @Matches(/^\S.*\S$/, {
    message: 'Password cannot start or end with whitespace',
  })
  newPassword: string;
}
