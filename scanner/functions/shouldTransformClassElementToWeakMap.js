function shouldTransformClassElementToWeakMap(node) {
                if (shouldTransformPrivateElementsOrClassStaticBlocks)
                    return true;
                if (hasStaticModifier(node) && getInternalEmitFlags(node) & 32 /* TransformPrivateStaticElements */)
                    return true;
                return false;
            }