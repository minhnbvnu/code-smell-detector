function labelIdForElement(el) {
    if (el.id) {
      const label = document.querySelector(`label[for=${el.id}]`);
      return label ? label.innerHTML : el.id;
    }
  }