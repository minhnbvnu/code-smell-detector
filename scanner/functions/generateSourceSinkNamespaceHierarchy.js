function generateSourceSinkNamespaceHierarchy (system, result) {
  const snsHierarchy = []
  result.forEach(item => {
    if (item.nsSys.includes(system)) {
      let instance = snsHierarchy.find(i => i.value === item.nsInstance)
      if (!instance) {
        const newInstance = {
          value: item.nsInstance,
          label: item.nsInstance,
          children: []
        }
        snsHierarchy.push(newInstance)
        instance = newInstance
      }

      let database = instance.children.find(i => i.value === item.nsDatabase)
      if (!database) {
        const newDatabase = {
          value: item.nsDatabase,
          label: item.nsDatabase,
          children: []
        }
        instance.children.push(newDatabase)
        database = newDatabase
      }

      let table = database.children.find(i => i.value === item.nsTable)
      if (!table) {
        const newTable = {
          value: item.nsTable,
          label: item.nsTable,
          id: item.id,
          nsSys: item.nsSys
        }
        database.children.push(newTable)
      }
    }
  })
  return snsHierarchy
}