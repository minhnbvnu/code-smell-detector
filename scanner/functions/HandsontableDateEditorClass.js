function HandsontableDateEditorClass(instance) {
  if (!$.datepicker) {
    throw new Error("jQuery UI Datepicker dependency not found. Did you forget to include jquery-ui.custom.js or its substitute?");
  }

  this.isCellEdited = false;
  this.instance = instance;
  var that = this;
  this.createElements();
  this.bindEvents();

  this.instance.addHook('afterDestroy', function(){
    that.destroyElements();
  })
}