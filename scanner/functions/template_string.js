function template_string() {
                var segments = [], start = S.token;
                segments.push(new AST_TemplateSegment({
                    start: S.token,
                    raw: TEMPLATE_RAWS.get(S.token),
                    value: S.token.value,
                    end: S.token
                }));
                while (!S.token.template_end) {
                    next();
                    handle_regexp();
                    segments.push(expression(true));
                    segments.push(new AST_TemplateSegment({
                        start: S.token,
                        raw: TEMPLATE_RAWS.get(S.token),
                        value: S.token.value,
                        end: S.token
                    }));
                }
                next();
                return new AST_TemplateString({
                    start: start,
                    segments: segments,
                    end: S.token
                });
            }