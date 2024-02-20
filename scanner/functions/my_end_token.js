function my_end_token(moznode) {
                var loc = moznode.loc, end = loc && loc.end;
                var range = moznode.range;
                return new AST_Token("", "", end && end.line || 0, end && end.column || 0, range ? range[0] : moznode.end, false, [], [], loc && loc.source);
            }