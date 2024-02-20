function getNativeRegexpTest() {
        var descriptor = Object.getOwnPropertyDescriptor(RegExp.prototype, "test");
        var nativeRegexTest = descriptor === null || descriptor === void 0 ? void 0 : descriptor.value;
        if (descriptor && typeof descriptor.value === "function") {
          return nativeRegexTest;
        }
        throw new Error("RegExp.prototype.test is not a function");
      }