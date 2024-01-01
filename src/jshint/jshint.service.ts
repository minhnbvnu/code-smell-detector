import { Injectable } from "@nestjs/common";
import { JSHINT } from "jshint";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class JshintService {
  readFilesInDirectory(directoryPath: string) {
    const files = fs.readdirSync(directoryPath);

    const fileContents = files.map((file) => {
      const filePath = path.join(directoryPath, file);
      const content = fs.readFileSync(filePath, "utf-8");
      return content;
    });

    return fileContents;
  }

  async findComplexMethod() {
    const files = this.readFilesInDirectory("scanner/functions");

    var source = files;
    var options = {
      undef: true,
    };
    var predef = {
      foo: false,
    };

    JSHINT(source, options, predef);
    const analyzeRes = JSHINT.data();
    const functions = analyzeRes.functions;
    const functionsWithComplexity = functions
      .filter((f) => f.metrics.complexity > 15)
      .map((f) => f.name);
    return functionsWithComplexity;
  }
}
