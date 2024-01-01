import { Controller, Post } from "@nestjs/common";
import { JshintService } from "./jshint.service";

@Controller("jshint")
export class JshintController {
  constructor(private readonly jshintService: JshintService) {}

  @Post()
  findComplexMethod() {
    return this.jshintService.findComplexMethod();
  }
}
