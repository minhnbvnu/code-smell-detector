function MeasureTextCanvas(fontFace, fontSize, baseLine, text) {
      this.canvas = document.createElement('canvas');
      this.canvas.setAttribute('width', fontSize + "px");
      this.canvas.setAttribute('height', fontSize + "px");
      this.ctx = this.canvas.getContext("2d");
      this.ctx.font = fontSize + "pt " + fontFace;
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, fontSize, fontSize);
      this.ctx.fillStyle = "white";
      this.ctx.fillText(text, 0, baseLine);
      this.imageData = this.ctx.getImageData(0, 0, fontSize, fontSize);

      this.get = function(x, y) {
        return this.imageData.data[((y*(this.imageData.width*4)) + (x*4))];
      };
    }