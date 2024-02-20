function XRTouch(touchID, pageElement, xPercentage, yPercentage) {
        this.identifier = touchID;
        this.ended = false;
        var rect = pageElement.getBoundingClientRect();
        // It was pageElement.size / window.devicePixelRatio, but now we treat devicePixelRatio in XR session as 1
        this.clientX = lerp(rect.left, rect.left + pageElement.width / 1, xPercentage);
        this.clientY = lerp(rect.top, rect.top + pageElement.height / 1, yPercentage);
        this.layerX = this.clientX;
        this.layerY = this.clientY;
        this.offsetX = this.clientX;
        this.offsetY = this.clientY;
        this.pageX = this.clientX;
        this.pageY = this.clientY;
        this.x = this.clientX;
        this.y = this.clientY;
        this.screenX = this.clientX;
        this.screenY = this.clientY;
        this.movementX = 0; // diff between movements
        this.movementY = 0; // diff between movements
        this.UpdateTouch = function (pageElement, xPercentage, yPercentage) {
          var rect = pageElement.getBoundingClientRect();
          var newClientX = lerp(rect.left, rect.left + pageElement.width / 1, xPercentage);
          var newClientY = lerp(rect.top, rect.top + pageElement.height / 1, yPercentage);
          this.movementX = newClientX-this.clientX;
          this.movementY = newClientY-this.clientY;
          this.clientX = newClientX;
          this.clientY = newClientY;
          this.layerX = this.clientX;
          this.layerY = this.clientY;
          this.offsetX = this.clientX;
          this.offsetY = this.clientY;
          this.pageX = this.clientX;
          this.pageY = this.clientY;
          this.x = this.clientX;
          this.y = this.clientY;
          this.screenX = this.clientX;
          this.screenY = this.clientY;
        }
        this.HasMovement = function () {
          return (this.movementX != 0 || this.movementY != 0);
        }
        this.ResetMovement = function () {
          this.movementX = 0;
          this.movementY = 0;
        }
      }