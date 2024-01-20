import { Injectable } from "@nestjs/common";
import { exec } from "child_process";

@Injectable()
export class TokenizerService {
  constructor() {}
  tokenize() {
    const dir = exec(
      "tokenizer scanner/functions/Ref.js",
      //   "pwd",
      function (err, stdout, stderr) {
        if (err) {
          // should have err.code here?
        }
        console.log({ stdout });
      }
    );

    dir.on("exit", function (code) {
      console.log({ code });
    });
  }
}
