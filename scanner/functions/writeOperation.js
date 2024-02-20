function writeOperation(operationIndex) {
                tryEnterLabel(operationIndex);
                tryEnterOrLeaveBlock(operationIndex);
                if (lastOperationWasAbrupt) {
                    return;
                }
                lastOperationWasAbrupt = false;
                lastOperationWasCompletion = false;
                const opcode = operations[operationIndex];
                if (opcode === 0 /* Nop */) {
                    return;
                }
                else if (opcode === 10 /* Endfinally */) {
                    return writeEndfinally();
                }
                const args = operationArguments[operationIndex];
                if (opcode === 1 /* Statement */) {
                    return writeStatement(args[0]);
                }
                const location = operationLocations[operationIndex];
                switch (opcode) {
                    case 2 /* Assign */:
                        return writeAssign(args[0], args[1], location);
                    case 3 /* Break */:
                        return writeBreak(args[0], location);
                    case 4 /* BreakWhenTrue */:
                        return writeBreakWhenTrue(args[0], args[1], location);
                    case 5 /* BreakWhenFalse */:
                        return writeBreakWhenFalse(args[0], args[1], location);
                    case 6 /* Yield */:
                        return writeYield(args[0], location);
                    case 7 /* YieldStar */:
                        return writeYieldStar(args[0], location);
                    case 8 /* Return */:
                        return writeReturn(args[0], location);
                    case 9 /* Throw */:
                        return writeThrow(args[0], location);
                }
            }