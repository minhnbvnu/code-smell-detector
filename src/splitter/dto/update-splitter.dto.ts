import { PartialType } from '@nestjs/mapped-types';
import { CreateSplitterDto } from './create-splitter.dto';

export class UpdateSplitterDto extends PartialType(CreateSplitterDto) {}
