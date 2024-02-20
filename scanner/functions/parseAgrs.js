function parseAgrs(agrs = []) {
    let params = {};
    agrs.forEach(agr => {
      const sep = agr.indexOf(':');
      const [appName, name, type] = agr.slice(0, sep).split('-');
      const val = agr.slice(sep + 1);
      params[name] = type === 'function'? eval('(' + val + ')'): 
                      type === 'object'? JSON.parse(val):
                      val;
    });
    return params;
  }