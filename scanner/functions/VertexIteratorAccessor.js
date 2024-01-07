constructor(buffer, vertexElement, vertexFormat) {
        this.index = 0;
        this.numComponents = vertexElement.numComponents;

        // create the typed array based on the element data type
        if (vertexFormat.interleaved) {
            this.array = new typedArrayTypes[vertexElement.dataType](buffer, vertexElement.offset);
        } else {
            this.array = new typedArrayTypes[vertexElement.dataType](buffer, vertexElement.offset, vertexFormat.vertexCount * vertexElement.numComponents);
        }

        // BYTES_PER_ELEMENT is on the instance and constructor for Chrome, Safari and Firefox, but just the constructor for Opera
        this.stride = vertexElement.stride / this.array.constructor.BYTES_PER_ELEMENT;

        // Methods
        switch (vertexElement.numComponents) {
            case 1:
                this.set = set1;
                this.getToArray = arrayGet1;
                this.setFromArray = arraySet1;
                break;

            case 2:
                this.set = set2;
                this.getToArray = arrayGet2;
                this.setFromArray = arraySet2;
                break;

            case 3:
                this.set = set3;
                this.getToArray = arrayGet3;
                this.setFromArray = arraySet3;
                break;

            case 4:
                this.set = set4;
                this.getToArray = arrayGet4;
                this.setFromArray = arraySet4;
                break;
        }
    }