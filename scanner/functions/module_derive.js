function module_derive(injects, injectModule) {
  const map = new Map();
  const modules = new Set();
  const copies = [];

  // Given a module, derives an alias of that module with an initially-empty
  // definition. The variables will be copied later in a second pass below.
  function alias(source) {
    let target = map.get(source);
    if (target) return target;
    target = new Module(source._runtime, source._builtins);
    target._source = source;
    map.set(source, target);
    copies.push([target, source]);
    modules.add(source);
    return target;
  }

  // Inject the given variables as reverse imports into the derived module.
  const derive = alias(this);
  for (const inject of injects) {
    const {alias, name} = typeof inject === "object" ? inject : {name: inject};
    derive.import(name, alias == null ? name : alias, injectModule);
  }

  // Iterate over all the variables (currently) in this module. If any
  // represents an import-with (i.e., an import of a module with a _source), the
  // transitive import-with must be copied, too, as direct injections may affect
  // transitive injections. Note that an import-with can only be created with
  // module.derive and hence it’s not possible for an import-with to be added
  // later; therefore we only need to apply this check once, now.
  for (const module of modules) {
    for (const [name, variable] of module._scope) {
      if (variable._definition === identity) { // import
        if (module === this && derive._scope.has(name)) continue; // overridden by injection
        const importedModule = variable._inputs[0]._module;
        if (importedModule._source) alias(importedModule);
      }
    }
  }

  // Finally, with the modules resolved, copy the variable definitions.
  for (const [target, source] of copies) {
    for (const [name, sourceVariable] of source._scope) {
      const targetVariable = target._scope.get(name);
      if (targetVariable && targetVariable._type !== TYPE_IMPLICIT) continue; // preserve injection
      if (sourceVariable._definition === identity) { // import
        const sourceInput = sourceVariable._inputs[0];
        const sourceModule = sourceInput._module;
        target.import(sourceInput._name, name, map.get(sourceModule) || sourceModule);
      } else { // non-import
        target.define(name, sourceVariable._inputs.map(variable_name), sourceVariable._definition);
      }
    }
  }

  return derive;
}