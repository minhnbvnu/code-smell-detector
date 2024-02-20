function setCursorPosition($input, pos) {
    var input = $input[0], range;

    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(pos, pos);
    }

    else if (input.createTextRange) {
      range = input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }