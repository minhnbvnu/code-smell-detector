function has__name__(node) {
            return node.members.find((member) => typescript_1.default.isPropertyDeclaration(member) && member.name.getText() == "__name__" && is_static(member)) != null;
        }