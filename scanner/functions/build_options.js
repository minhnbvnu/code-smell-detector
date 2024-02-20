function build_options(values) {
                return values.map((el) => {
                    let value, label;
                    if ((0, types_1.isString)(el))
                        value = label = el;
                    else
                        [value, label] = el;
                    _known_values.add(value);
                    return (0, dom_1.option)({ value }, label);
                });
            }