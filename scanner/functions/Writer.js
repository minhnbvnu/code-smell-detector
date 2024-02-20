function Writer() {
  Component.apply(this, arguments);
  // Mixin
  EventEmitter.call(this);

  this.config = this.props.config || {};

  this.handleApplicationKeyCombos = this.handleApplicationKeyCombos.bind(this);
  this.onSelectionChangedDebounced = _.debounce(this.onSelectionChanged, 50);

  this._registerExtensions();
  this._initializeComponentRegistry();
  this._initializeToolRegistry();

  // action handlers
  this.actions({
    "switch-state": this.switchState,
    "switch-context": this.switchContext,
    "open-modal": this.openModal,
    "close-modal": this.closeModal,
    "request-save": this.requestSave,
    "execute-command": this.executeCommand,
  });
}