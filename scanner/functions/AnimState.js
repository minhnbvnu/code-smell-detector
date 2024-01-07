constructor(controller, name, speed = 1, loop = true, blendTree) {
        this._controller = controller;
        this._name = name;
        this._speed = speed;
        this._loop = loop;
        this._hasAnimations = false;
        if (blendTree) {
            this._blendTree = this._createTree(
                blendTree.type,
                this,
                null,
                name,
                1.0,
                blendTree.parameter ? [blendTree.parameter] : blendTree.parameters,
                blendTree.children,
                blendTree.syncAnimations,
                this._createTree,
                this._controller.findParameter
            );
        } else {
            this._blendTree = new AnimNode(this, null, name, 1.0, speed);
        }
    }