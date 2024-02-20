function doChange23(file, start, length2, code, context) {
            let startPosition;
            let endPosition;
            if (code === Diagnostics._0_is_defined_as_an_accessor_in_class_1_but_is_overridden_here_in_2_as_an_instance_property.code) {
                startPosition = start;
                endPosition = start + length2;
            }
            else if (code === Diagnostics._0_is_defined_as_a_property_in_class_1_but_is_overridden_here_in_2_as_an_accessor.code) {
                const checker = context.program.getTypeChecker();
                const node = getTokenAtPosition(file, start).parent;
                Debug.assert(isAccessor(node), "error span of fixPropertyOverrideAccessor should only be on an accessor");
                const containingClass = node.parent;
                Debug.assert(isClassLike(containingClass), "erroneous accessors should only be inside classes");
                const base = singleOrUndefined(getAllSupers(containingClass, checker));
                if (!base)
                    return [];
                const name = unescapeLeadingUnderscores(getTextOfPropertyName(node.name));
                const baseProp = checker.getPropertyOfType(checker.getTypeAtLocation(base), name);
                if (!baseProp || !baseProp.valueDeclaration)
                    return [];
                startPosition = baseProp.valueDeclaration.pos;
                endPosition = baseProp.valueDeclaration.end;
                file = getSourceFileOfNode(baseProp.valueDeclaration);
            }
            else {
                Debug.fail("fixPropertyOverrideAccessor codefix got unexpected error code " + code);
            }
            return generateAccessorFromProperty(file, context.program, startPosition, endPosition, context, Diagnostics.Generate_get_and_set_accessors.message);
        }