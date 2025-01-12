import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsBoolean()
  @IsOptional() // Không bắt buộc phải gửi giá trị này
  isActive?: boolean;
}
