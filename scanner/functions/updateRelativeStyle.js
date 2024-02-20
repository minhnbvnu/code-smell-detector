function updateRelativeStyle(constraints) {
  const str = constraints.reduce(
    (acc, { target, op, dest, query, queryLength, valid }) => {
      if (!valid) return acc;

      let queryStr = "";
      if (query !== "" && queryLength !== null) {
        queryStr = `/ ${query} ${queryLength}`;
      }

      return acc + `, ${target} ${op} ${dest} ${queryStr}`;
    },
    ""
  );
  document
    .getElementById("actual-layout")
    .style.setProperty("--relative-constraints", str);
}