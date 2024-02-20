function getBoxCharacter(connector) {
                            switch (connector) {
                                case 3 /* UpDown */:
                                    return "\u2502" /* ud */;
                                case 12 /* LeftRight */:
                                    return "\u2500" /* lr */;
                                case 5 /* UpLeft */:
                                    return "\u256F" /* ul */;
                                case 9 /* UpRight */:
                                    return "\u2570" /* ur */;
                                case 6 /* DownLeft */:
                                    return "\u256E" /* dl */;
                                case 10 /* DownRight */:
                                    return "\u256D" /* dr */;
                                case 7 /* UpDownLeft */:
                                    return "\u2524" /* udl */;
                                case 11 /* UpDownRight */:
                                    return "\u251C" /* udr */;
                                case 13 /* UpLeftRight */:
                                    return "\u2534" /* ulr */;
                                case 14 /* DownLeftRight */:
                                    return "\u252C" /* dlr */;
                                case 15 /* UpDownLeftRight */:
                                    return "\u256B" /* udlr */;
                            }
                            return " ";
                        }