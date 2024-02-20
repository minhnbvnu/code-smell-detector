function needs_parens(node2, parent, is_right) {
    if (node2.type === "LogicalExpression" && parent.type === "LogicalExpression" && (parent.operator === "??" && node2.operator !== "??" || parent.operator !== "??" && node2.operator === "??")) {
      return true;
    }
    const precedence = EXPRESSIONS_PRECEDENCE[node2.type];
    const parent_precedence = EXPRESSIONS_PRECEDENCE[parent.type];
    if (precedence !== parent_precedence) {
      return !is_right && precedence === 15 && parent_precedence === 14 && parent.operator === "**" || precedence < parent_precedence;
    }
    if (precedence !== 13 && precedence !== 14) {
      return false;
    }
    if (
      /** @type {BinaryExpression} */
      node2.operator === "**" && parent.operator === "**"
    ) {
      return !is_right;
    }
    if (is_right) {
      return OPERATOR_PRECEDENCE[
        /** @type {BinaryExpression} */
        node2.operator
      ] <= OPERATOR_PRECEDENCE[parent.operator];
    }
    return OPERATOR_PRECEDENCE[
      /** @type {BinaryExpression} */
      node2.operator
    ] < OPERATOR_PRECEDENCE[parent.operator];
  }