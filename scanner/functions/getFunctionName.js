function getFunctionName(func) {
                        if (typeof func !== "function") {
                            return "";
                        }
                        else if (hasProperty(func, "name")) {
                            return func.name;
                        }
                        else {
                            const text = Function.prototype.toString.call(func);
                            const match = /^function\s+([\w\$]+)\s*\(/.exec(text);
                            return match ? match[1] : "";
                        }
                    }