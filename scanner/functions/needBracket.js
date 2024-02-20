function needBracket() {
                        var leftOp = ast[1][0];
                        return !(leftOp == "dot" || leftOp == "name");
                    }