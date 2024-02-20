function ForeignObjectRenderer(options) {
            this.canvas = options.canvas ? options.canvas : document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.options = options;
            this.canvas.width = Math.floor(options.width * options.scale);
            this.canvas.height = Math.floor(options.height * options.scale);
            this.canvas.style.width = options.width + "px";
            this.canvas.style.height = options.height + "px";
            this.ctx.scale(this.options.scale, this.options.scale);
            this.ctx.translate(-options.x + options.scrollX, -options.y + options.scrollY);
            Logger.getInstance(options.id).debug("EXPERIMENTAL ForeignObject renderer initialized (" + options.width + "x" + options.height + " at " + options.x + "," + options.y + ") with scale " + options.scale);
        }