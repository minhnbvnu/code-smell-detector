constructor(device, material, layer) {
        this.material = material;
        this.layer = layer;

        // line data, arrays of numbers
        this.positions = [];
        this.colors = [];

        this.mesh = new Mesh(device);
        this.meshInstance = null;
    }