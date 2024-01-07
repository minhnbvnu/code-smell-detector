function buildNav(members) {
  const nav = [];
  members.classes.forEach(function (v) {
    // exclude interfaces from sidebar
    if (v.interface !== true) {
      nav.push({
        type: 'class',
        longname: v.longname,
        prettyname: getPrettyName(v),
        name: v.name,
        module: find({
          kind: 'module',
          longname: v.memberof,
        })[0],
        members: find({
          kind: 'member',
          memberof: v.longname,
        }),
        methods: find({
          kind: 'function',
          memberof: v.longname,
        }),
        typedefs: find({
          kind: 'typedef',
          memberof: v.longname,
        }),
        fires: v.fires,
        events: find({
          kind: 'event',
          memberof: v.longname,
        }),
      });
    }
  });
  members.modules.forEach(function (v) {
    const classes = find({
      kind: 'class',
      memberof: v.longname,
    });
    const members = find({
      kind: 'member',
      memberof: v.longname,
    });
    const methods = find({
      kind: 'function',
      memberof: v.longname,
    });
    const typedefs = find({
      kind: 'typedef',
      memberof: v.longname,
    });
    const events = find({
      kind: 'event',
      memberof: v.longname,
    });
    // Only add modules that contain more than just classes with their
    // associated Options typedef
    if (
      typedefs.length > classes.length ||
      members.length + methods.length > 0
    ) {
      nav.push({
        type: 'module',
        longname: v.longname,
        prettyname: getPrettyName(v),
        name: v.name,
        members: members,
        methods: methods,
        typedefs: typedefs,
        fires: v.fires,
        events: events,
      });
    }
  });

  nav.sort(function (a, b) {
    const prettyNameA = a.prettyname.toLowerCase();
    const prettyNameB = b.prettyname.toLowerCase();
    if (prettyNameA > prettyNameB) {
      return 1;
    }
    if (prettyNameA < prettyNameB) {
      return -1;
    }
    return 0;
  });
  return nav;
}