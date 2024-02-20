function mergeElementsOnToSelectors(elements, selectors) {
                var i, sel;
                if (elements.length === 0) {
                    return;
                }
                if (selectors.length === 0) {
                    selectors.push([new selector_1.default(elements)]);
                    return;
                }
                for (i = 0; (sel = selectors[i]); i++) {
                    // if the previous thing in sel is a parent this needs to join on to it
                    if (sel.length > 0) {
                        sel[sel.length - 1] = sel[sel.length - 1].createDerived(sel[sel.length - 1].elements.concat(elements));
                    }
                    else {
                        sel.push(new selector_1.default(elements));
                    }
                }
            }