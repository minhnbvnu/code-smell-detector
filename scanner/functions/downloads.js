function downloads() {

  var arch = getArch();

  var suffixes = {
    x86: [ "x86" ],
    x64: [ "x86", "x64" ],
    armv6: [ "armv6" ],
    armv7: [ "armv6", "armv7" ]
  }[arch].map(getSuffix);

  if (!suffixes) {
    throw new Error(
      "Unknown arch " + arch
    );
  }

  var items = [];

  children(binariesJson, function(suffix, key) {
    if (suffixes.indexOf(key) < 0) return; // *****
    children(suffix, function(version) {
      if (typeof version !== "object") return; // "default" string
      children(version, function(binary) {
        items.push(binary);
      });
    });
  });

  return items;

}