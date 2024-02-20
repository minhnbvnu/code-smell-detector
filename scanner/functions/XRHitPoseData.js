function XRHitPoseData() {
        this.frameIndex = 0;
        this.availableIndex = 0;
        this.positionIndices = [0, 0, 0];
        this.rotationIndices = [0, 0, 0, 0];

        this.setIndices = function(index) {
          this.frameIndex = index++;
          this.availableIndex = index++;
          this.positionIndices[0] = index++;
          this.positionIndices[1] = index++;
          this.positionIndices[2] = index++;
          this.rotationIndices[0] = index++;
          this.rotationIndices[1] = index++;
          this.rotationIndices[2] = index++;
          this.rotationIndices[3] = index;
        }
      }