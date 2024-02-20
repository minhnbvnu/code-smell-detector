function inline_array_like_spread(elements) {
            for (var i = 0; i < elements.length; i++) {
                var el = elements[i];
                if (el instanceof AST_Expansion) {
                    var expr = el.expression;
                    if (expr instanceof AST_Array
                        && !expr.elements.some(elm => elm instanceof AST_Hole)) {
                        elements.splice(i, 1, ...expr.elements);
                        // Step back one, as the element at i is now new.
                        i--;
                    }
                    // In array-like spread, spreading a non-iterable value is TypeError.
                    // We therefore can’t optimize anything else, unlike with object spread.
                }
            }
        }