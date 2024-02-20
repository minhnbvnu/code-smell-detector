function to_moz_in_destructuring() {
                var i = TO_MOZ_STACK.length;
                while (i--) {
                    if (TO_MOZ_STACK[i] instanceof AST_Destructuring) {
                        return true;
                    }
                }
                return false;
            }