function Transition(el, id, hooks, vm) {
    this.id = id;
    this.el = el;
    this.enterClass = hooks && hooks.enterClass || id + '-enter';
    this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
    this.hooks = hooks;
    this.vm = vm;
    // async state
    this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
    this.justEntered = false;
    this.entered = this.left = false;
    this.typeCache = {};
    // check css transition type
    this.type = hooks && hooks.type;
    /* istanbul ignore if */
    if ('development' !== 'production') {
      if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
        warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type, vm);
      }
    }
    // bind
    var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
      self[m] = bind(self[m], self);
    });
  }