function descend(obj) {
                for (const child of obj.child_views.values()) {
                    if (child instanceof placeholder_1.PlaceholderView) {
                        child.update(source, i, vars);
                    }
                    else if (child instanceof dom_element_1.DOMElementView) {
                        descend(child);
                    }
                }
            }