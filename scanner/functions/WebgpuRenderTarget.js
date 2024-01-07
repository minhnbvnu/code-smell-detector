constructor(renderTarget) {
        this.renderTarget = renderTarget;

        // color formats are based on the textures
        if (renderTarget._colorBuffers) {
            renderTarget._colorBuffers.forEach((colorBuffer, index) => {
                this.setColorAttachment(index, undefined, colorBuffer.impl.format);
            });
        }

        this.updateKey();
    }