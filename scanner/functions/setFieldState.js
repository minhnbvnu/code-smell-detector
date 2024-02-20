function setFieldState(name, value, inputValidity, inputTouched, inputError) {
    setValues({ [name]: value });
    setTouched({ [name]: inputTouched });
    setValidity({ [name]: inputValidity });
    setError({ [name]: inputError });
    updatePristine(name, value);
  }