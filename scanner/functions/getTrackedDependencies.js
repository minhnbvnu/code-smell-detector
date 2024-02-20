function getTrackedDependencies(object, property, tagInfo) {
  const tag = tagInfo.tag;
  const proto = Object.getPrototypeOf(object);
  if (!proto) return [];
  const cpDesc = emberMeta(object).peekDescriptors(property);
  const dependentKeys = [];
  if (cpDesc) {
    dependentKeys.push(...(cpDesc._dependentKeys || []));
  }
  if (HAS_GLIMMER_TRACKING) {
    const ownTag = tagForProperty(object, property);
    const props = getTagTrackedProps(tag, ownTag);
    const mapping = {};
    let maxRevision = tagInfo.revision ?? 0;
    let minRevision = Infinity;
    props.forEach((t) => {
      const p =
        (t._object ? getObjectName(t._object) + '.' : '') + t._propertyKey;
      const [objName, ...props] = p.split('.');
      mapping[objName] = mapping[objName] || new Set();
      maxRevision = Math.max(maxRevision, t.revision);
      minRevision = Math.min(minRevision, t.revision);
      props.forEach((p) => mapping[objName].add([p, t.revision]));
    });

    const hasChange = maxRevision !== minRevision;

    Object.entries(mapping).forEach(([objName, props]) => {
      if (props.size > 1) {
        dependentKeys.push(objName);
        props.forEach((p) => {
          const changed = hasChange && p[1] >= maxRevision ? ' 🔸' : '';
          dependentKeys.push('  •  --  ' + p[0] + changed);
        });
      }
      if (props.size === 1) {
        const p = [...props][0];
        const changed = hasChange && p[1] >= maxRevision ? ' 🔸' : '';
        dependentKeys.push(objName + '.' + p[0] + changed);
      }
      if (props.size === 0) {
        dependentKeys.push(objName);
      }
    });
  }

  return [...new Set([...dependentKeys])];
}