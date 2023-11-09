import { PartialType } from '@nestjs/mapped-types';
import { CreateUSerDto } from './user.dto';
export class UpdateUserDto extends PartialType(CreateUSerDto) {}