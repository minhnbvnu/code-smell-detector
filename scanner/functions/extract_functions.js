function extract_functions() {
                    var tail = statements.slice(i + 1);
                    statements.length = i + 1;
                    return tail.filter(function (stat) {
                        if (stat instanceof AST_Defun) {
                            statements.push(stat);
                            return false;
                        }
                        return true;
                    });
                }