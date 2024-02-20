function parameters(params) {
                var used_parameters = new UsedParametersTracker(true, S.input.has_directive("use strict"));
                expect("(");
                while (!is("punc", ")")) {
                    var param = parameter(used_parameters);
                    params.push(param);
                    if (!is("punc", ")")) {
                        expect(",");
                    }
                    if (param instanceof AST_Expansion) {
                        break;
                    }
                }
                next();
            }