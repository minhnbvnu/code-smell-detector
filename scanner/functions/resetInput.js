function resetInput(user) {
      if (!posEq(sel.from, sel.to)) {
        prevInput = "";
        input.value = getSelection();
        selectInput(input);
      } else if (user) prevInput = input.value = "";
    }