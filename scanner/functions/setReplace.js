function setReplace(replace,val,k,parent){var propertyDescriptor=Object.getOwnPropertyDescriptor(parent,k);void 0!==propertyDescriptor.get?propertyDescriptor.configurable?(Object.defineProperty(parent,k,{value:replace}),arr.push([parent,k,val,propertyDescriptor])):replacerStack.push([val,k,replace]):(parent[k]=replace,arr.push([parent,k,val]))}