function ensureOwnEffectMap(model, type) {
    let effects = model[type];
    if (!effects) {
      effects = model[type] = {};
    } else if (!model.hasOwnProperty(type)) {
      effects = model[type] = Object.create(model[type]);
      for (let p in effects) {
        let protoFx = effects[p];
        let instFx = effects[p] = Array(protoFx.length);
        for (let i=0; i<protoFx.length; i++) {
          instFx[i] = protoFx[i];
        }
      }
    }
    return effects;
  }