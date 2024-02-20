function interpret(val) {
          val = String(val);
          return /^\d+$/.test(val) ? val + "px" : val;
        }