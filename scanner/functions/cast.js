function cast(value, test) {
            if (value !== void 0 && test(value))
                return value;
            return Debug.fail(`Invalid cast. The supplied value ${value} did not pass the test '${Debug.getFunctionName(test)}'.`);
        }