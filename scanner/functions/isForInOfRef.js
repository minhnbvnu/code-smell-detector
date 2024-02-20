function isForInOfRef(ref) {
                let target = ref.identifier.parent;
                // "for (var ...) { return; }"
                if (target.type === "VariableDeclarator") {
                    target = target.parent.parent;
                }
                if (target.type !== "ForInStatement" && target.type !== "ForOfStatement") {
                    return false;
                }
                // "for (...) { return; }"
                if (target.body.type === "BlockStatement") {
                    target = target.body.body[0];
                    // "for (...) return;"
                }
                else {
                    target = target.body;
                }
                // For empty loop body
                if (!target) {
                    return false;
                }
                return target.type === "ReturnStatement";
            }