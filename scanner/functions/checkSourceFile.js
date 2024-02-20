function checkSourceFile(node) {
                var _a2, _b;
                (_a2 = tracing) == null ? void 0 : _a2.push(tracing.Phase.Check, "checkSourceFile", { path: node.path }, 
                /*separateBeginAndEnd*/
                true);
                mark("beforeCheck");
                checkSourceFileWorker(node);
                mark("afterCheck");
                measure("Check", "beforeCheck", "afterCheck");
                (_b = tracing) == null ? void 0 : _b.pop();
            }