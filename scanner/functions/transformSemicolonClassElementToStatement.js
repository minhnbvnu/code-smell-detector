function transformSemicolonClassElementToStatement(member) {
                return setTextRange(factory2.createEmptyStatement(), member);
            }