function filterLogins(e) {
  // use fuzzy search to filter results
  var filter = e.target.value.trim().split(/[\s\/]+/);
  if (filter.length > 0) {
    logins = resultLogins.slice(0);
    filter.forEach(function(word) {
      if (word.length > 0) {
        var refine = [];
        FuzzySort.go(word, logins, { allowTypo: false }).forEach(function(
          result
        ) {
          refine.push(result.target);
        });
        logins = refine.slice(0);
      }
    });

    // fill login forms on submit rather than initiating a search
    fillOnSubmit = logins.length > 0;
  } else {
    // reset the result list if the filter is empty
    logins = resultLogins.slice(0);
  }

  // redraw the list
  m.redraw();

  // show / hide the filter hint
  showFilterHint(logins.length);
}