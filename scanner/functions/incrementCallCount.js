function incrementCallCount() {
      this.called = true;
      this.callCount += 1;
      this.notCalled = false;
      this.calledOnce = this.callCount == 1;
      this.calledTwice = this.callCount == 2;
      this.calledThrice = this.callCount == 3;
    }