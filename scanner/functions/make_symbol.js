function make_symbol(type, quote) {
                    return new type({
                        name: as_property_name(),
                        quote: quote || undefined,
                        start: prev(),
                        end: prev()
                    });
                }