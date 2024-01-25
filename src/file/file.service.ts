import { Injectable } from "@nestjs/common";
import * as fs from "fs";

@Injectable()
export class FileService {
  constructor() {}
  getFunctions() {
    const files = fs.readdirSync("scanner/functions");
    console.log({ files });
    return files;
  }
  escapeSpecialCharacter(fileName: string) {
    return fileName.replace(/(["'$`\\])/g, "\\$1") + "";
  }
}
