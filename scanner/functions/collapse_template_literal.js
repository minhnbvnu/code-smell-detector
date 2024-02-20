function collapse_template_literal(literal2) {
    if (!literal2.quasis.length)
      return;
    const collapsed_quasis = [];
    const collapsed_expressions = [];
    let cur_quasi = literal2.quasis[0];
    for (let i = 0; i < literal2.quasis.length; i++) {
      const expr = literal2.expressions[i];
      const next_quasi = literal2.quasis[i + 1];
      if (next_quasi && expr && expr.type === "Literal" && typeof expr.value === "string") {
        cur_quasi.value.raw += escape_template(expr.value) + next_quasi.value.raw;
      } else {
        if (expr) {
          collapsed_expressions.push(expr);
        }
        collapsed_quasis.push(cur_quasi);
        cur_quasi = next_quasi;
      }
    }
    literal2.quasis = collapsed_quasis;
    literal2.expressions = collapsed_expressions;
  }