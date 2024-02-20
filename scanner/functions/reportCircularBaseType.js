function reportCircularBaseType(node, type) {
                error(node, Diagnostics.Type_0_recursively_references_itself_as_a_base_type, typeToString(type, 
                /*enclosingDeclaration*/
                void 0, 2 /* WriteArrayAsGenericType */));
            }