function isInClassStaticInitializerRange(node, location) {
        return node.body.some(classMember => ((classMember.type === "StaticBlock" &&
            isInRange(classMember, location)) ||
            (classMember.type === "PropertyDefinition" &&
                classMember.static &&
                classMember.value &&
                isInRange(classMember.value, location))));
    }