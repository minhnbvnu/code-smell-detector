function getHeader(flags) {
                            if (flags & 2 /* Start */)
                                return "Start";
                            if (flags & 4 /* BranchLabel */)
                                return "Branch";
                            if (flags & 8 /* LoopLabel */)
                                return "Loop";
                            if (flags & 16 /* Assignment */)
                                return "Assignment";
                            if (flags & 32 /* TrueCondition */)
                                return "True";
                            if (flags & 64 /* FalseCondition */)
                                return "False";
                            if (flags & 128 /* SwitchClause */)
                                return "SwitchClause";
                            if (flags & 256 /* ArrayMutation */)
                                return "ArrayMutation";
                            if (flags & 512 /* Call */)
                                return "Call";
                            if (flags & 1024 /* ReduceLabel */)
                                return "ReduceLabel";
                            if (flags & 1 /* Unreachable */)
                                return "Unreachable";
                            throw new Error();
                        }