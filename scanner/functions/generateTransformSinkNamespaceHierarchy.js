function generateTransformSinkNamespaceHierarchy (system, result) {
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
          label: item.nsDatabase
          // children: []
        }
        instance.children.push(newDatabase)
        // database = newDatabase
      }

      // let permission = database.children.find(i => i.value === item.permission)
      // if (!permission) {
      //   const newPermission = {
      //     value: item.permission,
      //     label: item.permission
      //   }
      //   database.children.push(newPermission)
      // }
    }
  })
  return snsHierarchy
}