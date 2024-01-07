constructor(state, parent, name, point, parameters, children, syncAnimations, createTree, findParameter) {
        children.sort((a, b) => a.point - b.point);
        super(state, parent, name, point, parameters, children, syncAnimations, createTree, findParameter);
    }