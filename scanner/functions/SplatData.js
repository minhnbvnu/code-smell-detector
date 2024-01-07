constructor(elements, performZScale = true) {
        this.elements = elements;
        this.vertexElement = elements.find(element => element.name === 'vertex');

        if (!this.isCompressed && performZScale) {
            mat4.setScale(-1, -1, 1);
            this.transform(mat4);
        }
    }