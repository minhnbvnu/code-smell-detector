function getDSRStates () {
  // This function effectively returns the default DSR state at runtime
  function p7DSRFunction($dsr$) {
    // allow standard DSR behavior by returning true if $dsr$.redirect has a state set
    if ($dsr$.redirect.state) return true;
    // Otherwise, return a redirect object {state: "foo", params: {} } for the default case
    return {
      state: ($dsr$.to.params.param == 2) ? "p7.child2" : "p7.child1",
      params: {}
    };
  }

  return [
    { name: 'other' },
    { name: 'tabs' },
    { name: 'tabs.tabs1', deepStateRedirect: true },
    { name: 'tabs.tabs1.deep' },
    { name: 'tabs.tabs1.deep.nest' },
    { name: 'tabs.tabs2', deepStateRedirect: true },
    { name: 'tabs.tabs2.deep' },
    { name: 'tabs.tabs2.deep.nest' },
    { name: 'p1', url: '/p1/:param1/:param2', deepStateRedirect: { params: ['param1'] } },
    { name: 'p1.child' },
    { name: 'p2', url: '/p2/:param1/:param2', deepStateRedirect: { params: true } },
    { name: 'p2.child' },
    { name: 'p3', url: '/p3/:param1', deepStateRedirect: { params: true } },
    { name: 'p3.child'},
    { name: 'p4', url: '/p4', dsr: { default: "p4.child" } },
    { name: 'p4.child'},
    { name: 'p4.child2'},
    { name: 'p5', url: '/p5', dsr: { default: { state: "p5.child", params: { p5param: "1" } } } },
    { name: 'p5.child', url: '/child/:p5param'},
    { name: 'p6', url: '/p6/:param', dsr: { params: true, default: "p6.child1" } },
    { name: 'p6.child1'},
    { name: 'p6.child2'},
    { name: 'p6.child3'},
    { name: 'p7', url: '/p7/:param', dsr: { default: {}, fn: p7DSRFunction } },
    { name: 'p7.child1'},
    { name: 'p7.child2'},
    { name: 'p8', dsr: true },
    { name: 'p8child1', parent: 'p8' },
    { name: 'p8child2', parent: 'p8' }
  ];
}