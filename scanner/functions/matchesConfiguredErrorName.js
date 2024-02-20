function matchesConfiguredErrorName(name) {
                if (isPattern(errorArgument)) {
                    const regexp = new RegExp(errorArgument, "u");
                    return regexp.test(name);
                }
                return name === errorArgument;
            }