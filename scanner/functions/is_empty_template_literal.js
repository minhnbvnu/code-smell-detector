function is_empty_template_literal(template_literal) {
    return template_literal.expressions.length === 0 && template_literal.quasis.length === 1 && template_literal.quasis[0].value.raw === "";
  }