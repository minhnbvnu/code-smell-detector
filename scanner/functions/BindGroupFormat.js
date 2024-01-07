constructor(graphicsDevice, bufferFormats = [], textureFormats = [], storageTextureFormats = [], options = {}) {
        this.id = id++;
        DebugHelper.setName(this, `BindGroupFormat_${this.id}`);

        this.compute = options.compute ?? false;
        Debug.assert(this.compute || storageTextureFormats.length === 0, "Storage textures can be specified only for compute");

        /** @type {import('./graphics-device.js').GraphicsDevice} */
        this.device = graphicsDevice;
        const scope = graphicsDevice.scope;

        /** @type {BindBufferFormat[]} */
        this.bufferFormats = bufferFormats;

        // maps a buffer format name to an index
        /** @type {Map<string, number>} */
        this.bufferFormatsMap = new Map();
        bufferFormats.forEach((bf, i) => this.bufferFormatsMap.set(bf.name, i));

        /** @type {BindTextureFormat[]} */
        this.textureFormats = textureFormats;

        // maps a texture format name to a slot index
        /** @type {Map<string, number>} */
        this.textureFormatsMap = new Map();
        textureFormats.forEach((tf, i) => {
            this.textureFormatsMap.set(tf.name, i);

            // resolve scope id
            tf.scopeId = scope.resolve(tf.name);
        });

        /** @type {BindStorageTextureFormat[]} */
        this.storageTextureFormats = storageTextureFormats;

        // maps a storage texture format name to a slot index
        /** @type {Map<string, number>} */
        this.storageTextureFormatsMap = new Map();
        storageTextureFormats.forEach((tf, i) => {
            this.storageTextureFormatsMap.set(tf.name, i);

            // resolve scope id
            tf.scopeId = scope.resolve(tf.name);
        });

        this.impl = graphicsDevice.createBindGroupFormatImpl(this);

        Debug.trace(TRACEID_BINDGROUPFORMAT_ALLOC, `Alloc: Id ${this.id}`, this);
    }