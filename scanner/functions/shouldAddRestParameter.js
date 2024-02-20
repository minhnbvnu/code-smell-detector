function shouldAddRestParameter(node, inConstructorWithSynthesizedSuper) {
                return !!(node && node.dotDotDotToken && !inConstructorWithSynthesizedSuper);
            }