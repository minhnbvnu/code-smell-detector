function createCallProperties() {
      this.firstCall = this.getCall(0);
      this.secondCall = this.getCall(1);
      this.thirdCall = this.getCall(2);
      this.lastCall = this.getCall(this.callCount - 1);
    }