import { Controller, Post } from '@nestjs/common';
import { SplitterService } from './splitter.service';

@Controller('splitter')
export class SplitterController {
  constructor(private readonly splitterService: SplitterService) {}

  @Post()
  split() {
    return this.splitterService.split();
  }
}
