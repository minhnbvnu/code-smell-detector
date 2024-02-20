function parameter(used_parameters, symbol_type) {
                var param;
                var expand = false;
                if (used_parameters === undefined) {
                    used_parameters = new UsedParametersTracker(true, S.input.has_directive("use strict"));
                }
                if (is("expand", "...")) {
                    expand = S.token;
                    used_parameters.mark_spread(S.token);
                    next();
                }
                param = binding_element(used_parameters, symbol_type);
                if (is("operator", "=") && expand === false) {
                    used_parameters.mark_default_assignment(S.token);
                    next();
                    param = new AST_DefaultAssign({
                        start: param.start,
                        left: param,
                        operator: "=",
                        right: expression(false),
                        end: S.token
                    });
                }
                if (expand !== false) {
                    if (!is("punc", ")")) {
                        unexpected();
                    }
                    param = new AST_Expansion({
                        start: expand,
                        expression: param,
                        end: expand
                    });
                }
                used_parameters.check_strict();
                return param;
            }