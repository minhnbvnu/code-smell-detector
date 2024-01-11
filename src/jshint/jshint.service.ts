import { Injectable } from "@nestjs/common";
import { JSHINT } from "jshint";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class JshintService {
  readFilesInDirectory(directoryPath: string) {
    const files = fs.readdirSync(directoryPath);

    let fileContents: { fileContent: string[]; fileName: string }[] = [];
    files.forEach((fileName) => {
      const fileContent: string[] = [];
      const filePath = path.join(directoryPath, fileName);
      const content = fs.readFileSync(filePath, "utf-8");
      content
        .replace(/\t+/g, "")
        .split("\n")
        .forEach((line) => fileContent.push(line));
      fileContents.push({ fileContent, fileName });
    });
    // fileContents = fileContents.slice(0, 5);
    return fileContents;
  }

  async findComplexMethod() {
    const files = this.readFilesInDirectory("scanner/functions");
    console.log({ files });
    let res = [];
    for (let i = 0; i < files.length; i++) {
      const source = files[i].fileContent;
      // console.log("anaylyzing ", i, files[i].fileName);
      const options = {
        maxcomplexity: 15,
        asi: true,
        unused: false,
      };
      JSHINT(source, options);
      const analyzeRes = JSHINT.data();
      const functions = analyzeRes.functions;
      const functionsWithComplexity = functions
        .filter((f) => {
          console.log(f.name, f.metrics.complexity);
          return (
            f.metrics.complexity > 15 &&
            typeof f.name === "string" &&
            f.name + ".js" === files[i].fileName
          );
        })
        .forEach((f) => {
          // console.log("pushing", f.name);
          res.push(f.name + ".js");
        });

      console.log("anaylyzing done", i);
    }

    return res;
  }
}
