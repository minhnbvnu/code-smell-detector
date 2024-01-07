constructor(win, module) {
    this.support = new SandboxSupport(win, this);
    module.externalCall = this.support.createSandboxExternals();
    this._module = module;
    this._alertOnError = 0;
  }