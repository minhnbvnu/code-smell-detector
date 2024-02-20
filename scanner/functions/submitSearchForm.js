function submitSearchForm(e) {
  e.preventDefault();
  if (fillOnSubmit && logins.length > 0) {
    // fill using the first result
    getLoginData.bind(logins[0])();
  } else {
    // don't search without input.
    if (!this.s.value.length) {
      return;
    }

    // search for matching entries
    searchPassword(this.s.value, "search", false);
  }
}