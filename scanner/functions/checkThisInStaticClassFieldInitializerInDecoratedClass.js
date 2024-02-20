function checkThisInStaticClassFieldInitializerInDecoratedClass(thisExpression, container) {
                if (isPropertyDeclaration(container) && hasStaticModifier(container) && legacyDecorators && container.initializer && textRangeContainsPositionInclusive(container.initializer, thisExpression.pos) && hasDecorators(container.parent)) {
                    error(thisExpression, Diagnostics.Cannot_use_this_in_a_static_property_initializer_of_a_decorated_class);
                }
            }