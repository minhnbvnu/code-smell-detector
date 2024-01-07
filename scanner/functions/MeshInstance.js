constructor(mesh, material, node = null) {
        // if first parameter is of GraphNode type, handle previous constructor signature: (node, mesh, material)
        if (mesh instanceof GraphNode) {
            const temp = mesh;
            mesh = material;
            material = node;
            node = temp;
        }

        this._key = [0, 0];

        /**
         * The graph node defining the transform for this instance.
         *
         * @type {GraphNode}
         */
        this.node = node;           // The node that defines the transform of the mesh instance
        this._mesh = mesh;          // The mesh that this instance renders
        mesh.incRefCount();
        this.material = material;   // The material with which to render this instance

        this._shaderDefs = MASK_AFFECT_DYNAMIC << 16; // 2 byte toggles, 2 bytes light mask; Default value is no toggles and mask = pc.MASK_AFFECT_DYNAMIC
        this._shaderDefs |= mesh.vertexBuffer.format.hasUv0 ? SHADERDEF_UV0 : 0;
        this._shaderDefs |= mesh.vertexBuffer.format.hasUv1 ? SHADERDEF_UV1 : 0;
        this._shaderDefs |= mesh.vertexBuffer.format.hasColor ? SHADERDEF_VCOLOR : 0;
        this._shaderDefs |= mesh.vertexBuffer.format.hasTangents ? SHADERDEF_TANGENTS : 0;

        // Render options
        this.layer = LAYER_WORLD; // legacy
        /** @private */
        this._renderStyle = RENDERSTYLE_SOLID;
        this._receiveShadow = true;
        this._screenSpace = false;
        this._noDepthDrawGl1 = false;

        /**
         * Controls whether the mesh instance can be culled by frustum culling
         * ({@link CameraComponent#frustumCulling}). Defaults to true.
         *
         * @type {boolean}
         */
        this.cull = true;

        this._updateAabb = true;
        this._updateAabbFunc = null;
        this._calculateSortDistance = null;

        // 64-bit integer key that defines render order of this mesh instance
        this.updateKey();

        /**
         * @type {import('./skin-instance.js').SkinInstance|null}
         * @private
         */
        this._skinInstance = null;

        /**
         * @type {import('./morph-instance.js').MorphInstance|null}
         * @private
         */
        this._morphInstance = null;

        this.instancingData = null;

        /**
         * @type {BoundingBox|null}
         * @private
         */
        this._customAabb = null;

        // World space AABB
        this.aabb = new BoundingBox();
        this._aabbVer = -1;
        this._aabbMeshVer = -1;

        /**
         * Use this value to affect rendering order of mesh instances. Only used when mesh
         * instances are added to a {@link Layer} with {@link Layer#opaqueSortMode} or
         * {@link Layer#transparentSortMode} (depending on the material) set to
         * {@link SORTMODE_MANUAL}.
         *
         * @type {number}
         */
        this.drawOrder = 0;

        /**
         * Read this value in {@link Layer#onPostCull} to determine if the object is actually going
         * to be rendered.
         *
         * @type {boolean}
         */
        this.visibleThisFrame = false;

        // custom function used to customize culling (e.g. for 2D UI elements)
        this.isVisibleFunc = null;

        this.parameters = {};

        this.stencilFront = null;
        this.stencilBack = null;

        // Negative scale batching support
        this.flipFacesFactor = 1;
    }