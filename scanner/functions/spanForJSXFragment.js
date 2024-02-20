function spanForJSXFragment(node) {
                const textSpan = createTextSpanFromBounds(node.openingFragment.getStart(sourceFile), node.closingFragment.getEnd());
                const bannerText = "<>...</>";
                return createOutliningSpan(textSpan, "code" /* Code */, textSpan, 
                /*autoCollapse*/
                false, bannerText);
            }