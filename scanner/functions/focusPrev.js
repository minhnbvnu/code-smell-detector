function focusPrev(skip) {
  skip = skip || 1;
  entryWithFocus().removeClass('withfocus').prevAll(".item").eq(skip - 1).addClass('withfocus');
  if (!isFocusSet()) {
    (skip === 1 ? focusLast : focusFirst)();
  }

  scrollToFocus();
}