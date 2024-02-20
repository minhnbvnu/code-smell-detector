function chainTest(n) {
  planner = new Planner();
  var prev = null, first = null, last = null;

  // Build chain of n equality constraints
  for (var i = 0; i <= n; i++) {
    var name = "v" + i;
    var v = new Variable(name);
    if (prev != null)
      new EqualityConstraint(prev, v, Strength.REQUIRED);
    if (i == 0) first = v;
    if (i == n) last = v;
    prev = v;
  }

  new StayConstraint(last, Strength.STRONG_DEFAULT);
  var edit = new EditConstraint(first, Strength.PREFERRED);
  var edits = new OrderedCollection();
  edits.add(edit);
  var plan = planner.extractPlanFromConstraints(edits);
  for (var i = 0; i < 100; i++) {
    first.value = i;
    plan.execute();
    if (last.value != i)
      alert("Chain test failed.");
  }
}