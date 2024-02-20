function createValueModel (api, path, property) {
  let doc = api.getDocument()
  if (!property) property = doc.getProperty(path)
  let targetTypes = property.targetTypes
  let valueModel
  switch (property.type) {
    case 'boolean': {
      valueModel = new BooleanModel(api, path)
      break
    }
    case 'enum': {
      valueModel = new EnumModel(api, path)
      break
    }
    case 'number': {
      valueModel = new NumberModel(api, path)
      break
    }
    case 'string': {
      valueModel = new StringModel(api, path)
      break
    }
    case 'text': {
      valueModel = new TextModel(api, path)
      break
    }
    case 'object': {
      valueModel = new ObjectModel(api, path)
      break
    }
    default: {
      if (property.isReference()) {
        if (property.isOwned()) {
          if (property.isArray()) {
            valueModel = new CollectionModel(api, path, targetTypes)
          } else {
            valueModel = new ChildModel(api, path, targetTypes)
          }
        } else {
          if (property.isArray()) {
            valueModel = new ManyRelationshipModel(api, path, targetTypes)
          } else {
            valueModel = new SingleRelationshipModel(api, path, targetTypes)
          }
        }
      } else {
        valueModel = new ValueModel(api, path)
      }
    }
  }

  return valueModel
}