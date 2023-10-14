import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    required: true,
    example: 'test',
    description: 'User login',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, {
    message: 'Login cannot consist of whitespace only',
  })
  @Matches(/^\S.*\S$/, {
    message: 'Login cannot start or end with whitespace',
  })
  login: string;

  @ApiProperty({
    required: true,
    example: 'example',
    description: 'User password',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?!\s*$).+/, {
    message: 'Password cannot consist of whitespace only',
  })
  @Matches(/^\S.*\S$/, {
    message: 'Password cannot start or end with whitespace',
  })
  password: string;
}
