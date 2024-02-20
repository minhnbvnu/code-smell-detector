function sortByPackage(members, navList) {
    const packages = {};
    const invertedNavList = {};

    for (const type in navList) {
        navList[type].forEach((e) => { invertedNavList[e] = type; });
        packages[type] = [];
    }

    for (const type in members) {
        const member = members[type];
        if (!member || type == 'globals' || type == 'tutorials') { continue; }
        member.forEach((m) => {
            const p = invertedNavList[m.name] || invertedNavList[m.memberof];
            if (!p) { return; }
            packages[p].push(m);
        });
    }

    return packages;
}