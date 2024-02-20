function initUseDefPre(cur, parent, walker) {
                var context = walker.state;
                if(cur == null) {
                    cur = null;
                }
                if(cur.nodeType == TypeScript.NodeType.VarDecl) {
                    var varDecl = cur;
                    if(varDecl.init || TypeScript.hasFlag(varDecl.varFlags, TypeScript.VarFlags.AutoInit)) {
                        defSym(varDecl.sym, context);
                    }
                } else {
                    if(cur.nodeType == TypeScript.NodeType.Name) {
                        if(parent) {
                            if(parent.nodeType == TypeScript.NodeType.Asg) {
                                var asg = parent;
                                if(asg.operand1 == cur) {
                                    return cur;
                                }
                            } else {
                                if(parent.nodeType == TypeScript.NodeType.VarDecl) {
                                    var parentDecl = parent;
                                    if(parentDecl.id == cur) {
                                        return cur;
                                    }
                                }
                            }
                        }
                        var id = cur;
                        useSym(id.sym, context, cur);
                    } else {
                        if((cur.nodeType >= TypeScript.NodeType.Asg) && (cur.nodeType <= TypeScript.NodeType.LastAsg)) {
                            var asg = cur;
                            if(asg.operand1 && (asg.operand1.nodeType == TypeScript.NodeType.Name)) {
                                var id = asg.operand1;
                                defSym(id.sym, context);
                            }
                        } else {
                            if(cur.nodeType == TypeScript.NodeType.FuncDecl) {
                                walker.options.goChildren = false;
                            }
                        }
                    }
                }
                return cur;
            }