function should_have_attribute(node2, attributes, name2 = node2.name) {
    const article = regex_starts_with_vowel.test(attributes[0]) ? "an" : "a";
    const sequence = attributes.length > 1 ? attributes.slice(0, -1).join(", ") + ` or ${attributes[attributes.length - 1]}` : attributes[0];
    node2.component.warn(node2, compiler_warnings.a11y_missing_attribute(name2, article, sequence));
  }