function getColumnByName(column) {
  switch (column) {
    case "origin":
      return document.getElementById("siteCol");
    case "username":
      return document.getElementById("userCol");
    case "password":
      return document.getElementById("passwordCol");
    case "timeCreated":
      return document.getElementById("timeCreatedCol");
    case "timeLastUsed":
      return document.getElementById("timeLastUsedCol");
    case "timePasswordChanged":
      return document.getElementById("timePasswordChangedCol");
    case "timesUsed":
      return document.getElementById("timesUsedCol");
  }
  return undefined;
}