constructor(vertexBuffer) {
        // Store the vertex buffer
        this.vertexBuffer = vertexBuffer;
        this.vertexFormatSize = vertexBuffer.getFormat().size;

        // Lock the vertex buffer
        this.buffer = this.vertexBuffer.lock();

        // Create an empty list
        this.accessors = [];

        /**
         * The vertex buffer elements.
         *
         * @type {Object<string, VertexIteratorAccessor>}
         */
        this.element = {};

        // Add a new 'setter' function for each element
        const vertexFormat = this.vertexBuffer.getFormat();
        for (let i = 0; i < vertexFormat.elements.length; i++) {
            const vertexElement = vertexFormat.elements[i];
            this.accessors[i] = new VertexIteratorAccessor(this.buffer, vertexElement, vertexFormat);
            this.element[vertexElement.name] = this.accessors[i];
        }
    }