function getComparisonType(typeAnnotation) {
                return typeAnnotation
                    ? // if there's a type annotation, we can do a comparison
                        1 /* ComparisonType.Basic */
                    : // no type annotation means the variable's type will just be inferred, thus equal
                        0 /* ComparisonType.None */;
            }