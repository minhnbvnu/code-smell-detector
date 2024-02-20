function bindingNameText(name) {
                switch (name.kind) {
                    case 79 /* Identifier */:
                        return idText(name);
                    case 204 /* ArrayBindingPattern */:
                    case 203 /* ObjectBindingPattern */:
                        return bindingNameText(cast(first(name.elements), isBindingElement).name);
                    default:
                        return Debug.assertNever(name);
                }
            }