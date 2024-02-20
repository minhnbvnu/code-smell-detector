function relativize_specifier(context, source, expr) {
            const { factory } = context;
            if (expr != null && typescript_1.default.isStringLiteralLike(expr) && expr.text.length > 0) {
                const relative = relativize(source.fileName, expr.text);
                if (relative != null)
                    return factory.createStringLiteral(relative);
            }
            return null;
        }