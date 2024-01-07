function sortSoftwareVersions(versions, type) {
  return versions.sort((a, b) => {
    var aParts, bParts;
    if (type === 'major') {
      aParts = a.version.split('.');
      bParts = b.version.split('.');
    }
    else {
      aParts = a.split('.');
      bParts = b.split('.');
    }

    for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
      const aNum = Number(aParts[i]) || 0;
      const bNum = Number(bParts[i]) || 0;
      
      if (aNum > bNum)  return -1;
      else if (aNum < bNum) return 1;
    }
      
    return 0;
  });
}