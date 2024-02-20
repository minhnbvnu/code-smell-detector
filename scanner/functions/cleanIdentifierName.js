function cleanIdentifierName(name, fixCase=true) {
   if (!(name = cleanClassName(name, fixCase))) { return name; }
   // TODO: catch things like: ADBTester --> adbTester instead of aDBTester? Less important than for file names
   return name[0].toLowerCase() + name.slice(1);
}