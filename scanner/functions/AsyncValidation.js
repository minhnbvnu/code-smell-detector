function AsyncValidation($form, $input) {
    this.$form = $form;
    this.$input = $input;
    this.reset();
    $input.on('change paste', this.reset.bind(this));
  }