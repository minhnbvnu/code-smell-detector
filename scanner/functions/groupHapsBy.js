function groupHapsBy(eq, haps) {
  let groups = [];
  haps.forEach(hap => {
    const match = groups.findIndex(([other]) => eq(hap, other));

    if (match === -1) {
      groups.push([hap]);
    } else {
      groups[match].push(hap);
    }
  });
  return groups;
}