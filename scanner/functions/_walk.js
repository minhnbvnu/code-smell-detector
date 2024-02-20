function _walk (component, kinds) {
  if (component.children.length) {
    component.children.forEach(child => {
      _walk(component[child], kinds)
    })
  }
  if (component.template) {
    _walk(component(`{${component.template}}`), kinds)
  }

  const { pathItemObject = null } = component
  if (pathItemObject) {
    ['get', 'delete', 'options', 'patch', 'post', 'put']
      .filter(key => key in pathItemObject)
      .forEach(key => {
        const operation = {
          ...component.pathItemObject[key],
          path: component.getPath(),
          method: key
        }

        if (component.pathItemObject.parameters) {
          operation.parameters = operation.parameters || []
          operation.parameters = operation.parameters.concat(component.pathItemObject.parameters)
        }

        const { kind = null } = operation['x-kubernetes-group-version-kind'] || { kind: 'Cluster' }
        kinds[kind] = kinds[kind] || []
        //
        // kubernetes-client aliases some kinds (e.g., pods -> [pods, pod, po]. Skip aliases.
        //
        if (!kinds[kind].find(existingOperation => existingOperation.operationId === operation.operationId)) {
          kinds[kind].push(operation)
        }
      })
  }
}