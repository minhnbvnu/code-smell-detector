import { PartialType } from '@nestjs/mapped-types';
import { CreateEslintDto } from './create-eslint.dto';

export class UpdateEslintDto extends PartialType(CreateEslintDto) {}
