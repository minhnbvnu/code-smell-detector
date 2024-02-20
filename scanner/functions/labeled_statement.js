function labeled_statement() {
                var label = as_symbol(AST_Label);
                if (label.name === "await" && is_in_async()) {
                    token_error(S.prev, "await cannot be used as label inside async function");
                }
                if (S.labels.some((l) => l.name === label.name)) {
                    // ECMA-262, 12.12: An ECMAScript program is considered
                    // syntactically incorrect if it contains a
                    // LabelledStatement that is enclosed by a
                    // LabelledStatement with the same Identifier as label.
                    croak("Label " + label.name + " defined twice");
                }
                expect(":");
                S.labels.push(label);
                var stat = statement();
                S.labels.pop();
                if (!(stat instanceof AST_IterationStatement)) {
                    // check for `continue` that refers to this label.
                    // those should be reported as syntax errors.
                    // https://github.com/mishoo/UglifyJS2/issues/287
                    label.references.forEach(function (ref) {
                        if (ref instanceof AST_Continue) {
                            ref = ref.label.start;
                            croak("Continue label `" + label.name + "` refers to non-IterationStatement.", ref.line, ref.col, ref.pos);
                        }
                    });
                }
                return new AST_LabeledStatement({ body: stat, label: label });
            }