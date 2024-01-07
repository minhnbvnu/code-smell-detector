constructor(device, nodes, rootNode) {

        super();

        const numBones = nodes.length;
        this.init(device, numBones);

        this.device = device;
        this.rootNode = rootNode;

        // Unique bones per clone
        this.bones = nodes;
    }