import { Controller, Post } from "@nestjs/common";
import { EslintService } from "./eslint.service";

@Controller("eslint")
export class EslintController {
  constructor(private readonly eslintService: EslintService) {}

  @Post()
  findComplexMethod() {
    return this.eslintService.findComplexMethod();
  }
}
