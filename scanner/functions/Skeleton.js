constructor(graph) {
        /**
         * @type {import('./animation.js').Animation}
         * @private
         */
        this._animation = null;
        this._time = 0;

        this._interpolatedKeys = [];
        this._interpolatedKeyDict = {};
        this._currKeyIndices = {};

        this.graph = null;

        const addInterpolatedKeys = (node) => {
            const interpKey = new InterpolatedKey();
            interpKey._name = node.name;
            this._interpolatedKeys.push(interpKey);
            this._interpolatedKeyDict[node.name] = interpKey;
            this._currKeyIndices[node.name] = 0;

            for (let i = 0; i < node._children.length; i++)
                addInterpolatedKeys(node._children[i]);
        };

        addInterpolatedKeys(graph);
    }