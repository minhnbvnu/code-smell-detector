import { Controller, Post } from "@nestjs/common";
import { MismatcherService } from "./mismatcher.service";

@Controller("mismatcher")
export class MismatcherController {
  constructor(private readonly mismatcherService: MismatcherService) {}

  @Post("/")
  findMismatch(): Promise<any> {
    return this.mismatcherService.findMismatch();
  }
}
