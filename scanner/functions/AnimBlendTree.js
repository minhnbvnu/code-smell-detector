constructor(state, parent, name, point, parameters, children, syncAnimations, createTree, findParameter) {
        super(state, parent, name, point);
        this._parameters = parameters;
        this._parameterValues = new Array(parameters.length);
        this._children = [];
        this._findParameter = findParameter;
        this._syncAnimations = syncAnimations !== false;
        this._pointCache = {};
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.children) {
                this._children.push(createTree(
                    child.type,
                    this,
                    null,
                    name,
                    1.0,
                    child.parameter ? [child.parameter] : child.parameters,
                    child.children,
                    createTree,
                    findParameter
                ));
            } else {
                this._children.push(new AnimNode(state, this, child.name, child.point, child.speed));
            }
        }
    }