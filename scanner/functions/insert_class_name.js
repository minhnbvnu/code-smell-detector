function insert_class_name() {
        function has__name__(node) {
            return node.members.find((member) => typescript_1.default.isPropertyDeclaration(member) && member.name.getText() == "__name__" && is_static(member)) != null;
        }
        return (context) => (root) => {
            const { factory } = context;
            function visit(node) {
                node = typescript_1.default.visitEachChild(node, visit, context);
                if (typescript_1.default.isClassDeclaration(node) && node.name != null && !has__name__(node)) {
                    const property = factory.createPropertyDeclaration(factory.createModifiersFromModifierFlags(typescript_1.default.ModifierFlags.Static), "__name__", undefined, undefined, factory.createStringLiteral(node.name.text));
                    node = factory.updateClassDeclaration(node, node.modifiers, node.name, node.typeParameters, node.heritageClauses, [property, ...node.members]);
                }
                return node;
            }
            return typescript_1.default.visitEachChild(root, visit, context);
        };
    }