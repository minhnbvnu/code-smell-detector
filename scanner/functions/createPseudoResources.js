function createPseudoResources(template, current) {
  current = current || template.Resources;
  for (var k in current) {
    if (current[k] && current[k]["Fn::Join"]) {
      let joinList = current[k]["Fn::Join"][1];
      if (!Array.isArray(joinList)) {
        joinList = [joinList];
      }
      if (
        joinList.filter(
          (p) => typeof p === "object" && (!p.Ref || !p.Ref.startsWith("AWS::"))
        )
      ) {
        return;
      }
      current[k] = (Array.isArray(joinList)
        ? joinList
            .map((p) => {
              if (p[Object.keys(p)[0]] === "object") {
                return "";
              }
              if (Array.isArray(p[Object.keys(p)[0]])) {
                return "[]";
              }
              if (typeof p === "object" && p.Ref && p.Ref.startsWith("AWS::")) {
                return null;
              }
              return typeof p === "object"
                ? p[Object.keys(p)[0]].replace(/::/g, "-")
                : p;
            })
            .filter((p) => p)
        : [joinList]
      ).join(current[k]["Fn::Join"][0]);
    }
    if (typeof current[k] === "object" && current[k] !== null) {
      createPseudoResources(template, current[k]);
    } else if (
      typeof current[k] === "string" &&
      current[k].startsWith("arn:")
    ) {
      current[k] = current[k].replace(/\$\{AWS\:\:(.+?)\}/g, "").toLowerCase();
      if (!current[k]) {
        return;
      }
      const split = current[k].split(":");
      const service = split[2];
      const resourceType = split[5]
        ? split[5].split("/")[0].replace(/[\W_]+/g, "")
        : "";
      const name = `${split[2]} ${split[3]} ${split[4]}\n${split.slice(-1)[0]}`;
      template.Resources[name] = {
        Type: `External resource (aws::${service}::${resourceType})`,
      };
      current[k] = {
        Ref: name,
      };
    }
  }
}