function getModules ( args, startIndex ) {
  var modules = [];
  var module;

  for (var i = startIndex; i < args.length; i++ ) {
    module = args[i];
    if (!module || module[0] == '-') break;
    modules.push(module);
  }
  return modules;
}