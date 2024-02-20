function XRHandData() {
        this.frameIndex = 0;
        this.enabledIndex = 0;
        this.handIndex = 0;
        this.triggerIndex = 0;
        this.squeezeIndex = 0;
        this.pointerPositionXIndex = 0;
        this.pointerPositionYIndex = 0;
        this.pointerPositionZIndex = 0;
        this.pointerRotationXIndex = 0;
        this.pointerRotationYIndex = 0;
        this.pointerRotationZIndex = 0;
        this.pointerRotationWIndex = 0;
        this.jointsStartIndex = 0;
        this.poses = new Float32Array(16 * 25);
        this.radii = new Float32Array(25);
        this.jointQuaternion = new Float32Array(4);
        this.jointIndex = 0;
        this.bufferJointIndex = 0;
        this.handValuesType = 0;
        this.hasRadii = false;
        this.pinchSelectDistanceStart = 0.014;
        this.pinchSelectDistanceEnd = 0.015;
        this.pinchDistance = 1;
        this.thumbTip = 4 * 16;
        this.indexTip = 9 * 16;

        this.setIndices = function(index) {
          this.frameIndex = index++;
          this.enabledIndex = index++;
          this.handIndex = index++;
          this.triggerIndex = index++;
          this.squeezeIndex = index++;
          this.pointerPositionXIndex = index++;
          this.pointerPositionYIndex = index++;
          this.pointerPositionZIndex = index++;
          this.pointerRotationXIndex = index++;
          this.pointerRotationYIndex = index++;
          this.pointerRotationZIndex = index++;
          this.pointerRotationWIndex = index++;
          this.jointsStartIndex = index;
        }
      }