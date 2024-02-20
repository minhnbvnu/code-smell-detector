function getServiceDefinitions (proto) {
  const services = {}

  const visited = new Set()
  const queue = [proto]

  // Traverses the entire proto object looking for service definitions.
  while (queue.length > 0) {
    const current = queue.pop()

    if (visited.has(current)) {
      continue
    }

    for (const entry of Object.values(current)) {
      // Skip null / undefined
      if (!entry) {
        continue
      }

      // Service definitions may consist of classes or objects
      if (typeof entry !== 'object' && typeof entry !== 'function') {
        continue
      }

      // These objects won't contain services.
      if (entry.type && typeof entry.type !== 'object') {
        continue
      }

      // Buffers can be ignored, we're not going to find any services there.
      if (Buffer.isBuffer(entry)) {
        continue
      }

      queue.push(entry)

      if (isService(entry)) {
        const service = entry.service || entry
        const methodNames = Object.keys(service)
        const fullServiceName = getServiceNameFromPath(service[methodNames[0]].path)

        if (services[fullServiceName]) {
          continue
        }

        const shortServiceName = getShortServiceNameFromPath(service[methodNames[0]].path)

        const methods = Object
          .values(service)
          .reduce((methods, method) => {
            methods[method.path] = {
              ...getDesiredMethodProps(method),
              name: getMethodNameFromPath(method.path),
              fullName: method.path,
              package: getPackageNameFromPath(method.path),
              service: shortServiceName
            }

            return methods
          }, {})

        services[fullServiceName] = {
          shortServiceName,
          fullServiceName,
          service,
          methods
        }
      }
    }

    visited.add(current)
  }

  return services
}