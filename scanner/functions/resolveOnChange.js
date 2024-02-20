function resolveOnChange(target, e, onChange) {
  if (onChange) {
    var event = e;
    if (e.type === 'click') {
      // click clear icon
      event = Object.create(e);
      event.target = target;
      event.currentTarget = target;
      var originalInputValue = target.value; // change target ref value cause e.target.value should be '' when clear input

      target.value = '';
      onChange(event); // reset target ref value

      target.value = originalInputValue;
      return;
    }
    onChange(event);
  }
}