function doitem(ctor) {
                    out.print("AST_" + ctor.TYPE);
                    const props = ctor.SELF_PROPS.filter(prop => !/^\$/.test(prop));
                    if (props.length > 0) {
                        out.space();
                        out.with_parens(function () {
                            props.forEach(function (prop, i) {
                                if (i)
                                    out.space();
                                out.print(prop);
                            });
                        });
                    }
                    if (ctor.documentation) {
                        out.space();
                        out.print_string(ctor.documentation);
                    }
                    if (ctor.SUBCLASSES.length > 0) {
                        out.space();
                        out.with_block(function () {
                            ctor.SUBCLASSES.forEach(function (ctor) {
                                out.indent();
                                doitem(ctor);
                                out.newline();
                            });
                        });
                    }
                }