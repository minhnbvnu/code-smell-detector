function p7DSRFunction($dsr$) {
    // allow standard DSR behavior by returning true if $dsr$.redirect has a state set
    if ($dsr$.redirect.state) return true;
    // Otherwise, return a redirect object {state: "foo", params: {} } for the default case
    return {
      state: ($dsr$.to.params.param == 2) ? "p7.child2" : "p7.child1",
      params: {}
    };
  }