function my_start_token(moznode) {
                var loc = moznode.loc, start = loc && loc.start;
                var range = moznode.range;
                return new AST_Token("", "", start && start.line || 0, start && start.column || 0, range ? range[0] : moznode.start, false, [], [], loc && loc.source);
            }