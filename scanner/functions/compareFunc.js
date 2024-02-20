function compareFunc(a, b) {
    let valA, valB;
    switch (column) {
      case "origin":
        let realmA = a.httpRealm;
        let realmB = b.httpRealm;
        realmA = realmA == null ? "" : realmA.toLowerCase();
        realmB = realmB == null ? "" : realmB.toLowerCase();

        valA = a[column].toLowerCase() + realmA;
        valB = b[column].toLowerCase() + realmB;
        break;
      case "username":
      case "password":
        valA = a[column].toLowerCase();
        valB = b[column].toLowerCase();
        break;

      default:
        valA = a[column];
        valB = b[column];
    }

    if (valA < valB) {
      return -1;
    }
    if (valA > valB) {
      return 1;
    }
    return 0;
  }