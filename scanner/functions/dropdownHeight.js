function dropdownHeight() {
        return dd.getBoundingClientRect().top +
          parseInt(getComputedStyle(dd).maxHeight, 10);
      }