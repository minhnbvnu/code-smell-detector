function generateModelClass (nodeSchema) {
  // class GeneratedModel extends NodeModel { }
  // for (let prop of nodeSchema) {
  //   // skip id and type
  //   if (prop.name === 'id') continue
  //   GeneratedModel.prototype[_modelGetter(prop.name)] = function () {
  //     return this._propertyModels.get(prop.name)
  //   }
  //   // for primitive values add a simple getter to the node's property
  //   if (!prop.isReference()) {
  //     Object.defineProperty(GeneratedModel.prototype, prop.name, {
  //       get () { return this._node[prop.name] }
  //     })
  //     // for reference values resolve the underlying nodes
  //   } else {
  //     if (prop.isArray()) {
  //       Object.defineProperty(GeneratedModel.prototype, prop.name, {
  //         get () {
  //           let ids = this._node[prop.name]
  //           return ids.map(id => this._api.getModelById(id))
  //         }
  //       })
  //     } else {
  //       Object.defineProperty(GeneratedModel.prototype, prop.name, {
  //         get () {
  //           return this._api.getModelById(this._node[prop.name])
  //         }
  //       })
  //     }
  //   }
  // }
  // return GeneratedModel
}