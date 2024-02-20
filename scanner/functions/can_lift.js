function can_lift() {
            switch (op) {
              case "delete":
                return !may_not_delete(exp.tail_node());
              case "typeof":
                return !is_undeclared_ref(exp.tail_node());
              default:
                return true;
            }
        }