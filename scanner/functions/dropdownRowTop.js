function dropdownRowTop() {
        return dropdownRow().getBoundingClientRect().top -
          (dd.getBoundingClientRect().top +
           parseInt(getComputedStyle(dd).paddingTop, 10));
      }