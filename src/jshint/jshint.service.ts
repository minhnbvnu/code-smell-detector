import { Injectable } from "@nestjs/common";
import { JSHINT } from "jshint";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class JshintService {
  readFilesInDirectory(directoryPath: string) {
    const files = fs.readdirSync(directoryPath);

    let fileContents: string[] = [];
    files.forEach((file) => {
      const fileContent = [];
      const filePath = path.join(directoryPath, file);
      const content = fs.readFileSync(filePath, "utf-8");
      content
        .replace(/\t+/g, "")
        .split("\n")
        .forEach((line) => fileContents.push(line));
      // fileContents.push(fileContent);
    });
    // fileContents = fileContents.slice(0, 5);
    // console.log(fileContents.length);
    return fileContents;
  }

  async findComplexMethod() {
    const files = this.readFilesInDirectory("scanner/functions");
    let res = [];
    const source = files;
    console.log(files.length)
    // console.log("anaylyzing ", i)
    const options = {
      maxcomplexity: 15,
      asi: true,
      unused: false,
    };
    JSHINT(source, options);
    const analyzeRes = JSHINT.data();
    const functions = analyzeRes.functions;
    const functionsWithComplexity = functions
      .filter((f) => f.metrics.complexity > 15 && typeof f.name === 'string')
      .map((f) => f.name);
      
    res = [...res, ...functionsWithComplexity];
    // console.log("anaylyzing done", i)
    // for (let i = 0; i < files.length; i++) {
    //   const source = files[i];
    //   console.log("anaylyzing ", i)
    //   const options = {
    //     maxcomplexity: 15,
    //     asi: true,
    //     unused: false,
    //   };
    //   JSHINT(source, options);
    //   const analyzeRes = JSHINT.data();
    //   const functions = analyzeRes.functions;
    //   const functionsWithComplexity = functions
    //     .filter((f) => f.metrics.complexity > 15 && typeof f.name === 'string')
    //     .map((f) => f.name);
        
    //   res = [...res, ...functionsWithComplexity];
    //   console.log("anaylyzing done", i)

    // };

    return res;
  }
}
