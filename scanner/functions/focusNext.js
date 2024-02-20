function focusNext(skip) {
  skip = skip || 1;
  entryWithFocus().removeClass('withfocus').nextAll(".item").eq(skip - 1).addClass('withfocus');
  if (!isFocusSet()) {
    (skip === 1 ? focusFirst : focusLast)();
  }

  scrollToFocus();
}