function addElementToBindingPattern(bindingPattern, name, propertyName) {
                const element = factory.createBindingElement(
                /*dotDotDotToken*/
                void 0, propertyName, name);
                if (bindingPattern.elements.length) {
                    changes.insertNodeInListAfter(sourceFile, last(bindingPattern.elements), element);
                }
                else {
                    changes.replaceNode(sourceFile, bindingPattern, factory.createObjectBindingPattern([element]));
                }
            }