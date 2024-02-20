function is_indexOf_match_pattern() {
            switch (self.operator) {
              case "<=":
                // 0 <= array.indexOf(string) ---> !!~array.indexOf(string)
                return indexRight && self.left instanceof AST_Number && self.left.value == 0;
              case "<":
                // array.indexOf(string) < 0 ---> !~array.indexOf(string)
                if (indexLeft && self.right instanceof AST_Number && self.right.value == 0) return true;
                // -1 < array.indexOf(string) ---> !!~array.indexOf(string)
              case "==":
              case "!=":
                // -1 == array.indexOf(string) ---> !~array.indexOf(string)
                // -1 != array.indexOf(string) ---> !!~array.indexOf(string)
                if (!indexRight) return false;
                return self.left instanceof AST_Number && self.left.value == -1
                    || self.left instanceof AST_UnaryPrefix && self.left.operator == "-"
                        && self.left.expression instanceof AST_Number && self.left.expression.value == 1;
            }
        }