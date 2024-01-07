constructor(node, meshInstances = null) {
        this.node = node;

        this.component = node.render || node.model;
        meshInstances = meshInstances || this.component.meshInstances;

        // original component properties
        this.store();

        this.meshInstances = meshInstances;

        // world space aabb for all meshInstances
        this.bounds = null;

        // render target with attached color buffer for each render pass
        this.renderTargets = [];
    }