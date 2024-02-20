function getInstructionName(instruction) {
            switch (instruction) {
                case 2 /* Return */:
                    return "return";
                case 3 /* Break */:
                    return "break";
                case 4 /* Yield */:
                    return "yield";
                case 5 /* YieldStar */:
                    return "yield*";
                case 7 /* Endfinally */:
                    return "endfinally";
                default:
                    return void 0;
            }
        }