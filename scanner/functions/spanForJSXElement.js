function spanForJSXElement(node) {
                const textSpan = createTextSpanFromBounds(node.openingElement.getStart(sourceFile), node.closingElement.getEnd());
                const tagName = node.openingElement.tagName.getText(sourceFile);
                const bannerText = "<" + tagName + ">...</" + tagName + ">";
                return createOutliningSpan(textSpan, "code" /* Code */, textSpan, 
                /*autoCollapse*/
                false, bannerText);
            }