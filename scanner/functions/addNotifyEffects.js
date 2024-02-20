function addNotifyEffects(klass, template, templateInfo, options) {
      let hostProps = templateInfo.hostProps || {};
      for (let iprop in options.instanceProps) {
        delete hostProps[iprop];
        let userNotifyInstanceProp = options.notifyInstanceProp;
        if (userNotifyInstanceProp) {
          klass.prototype._addPropertyEffect(iprop,
            klass.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,
            {fn: createNotifyInstancePropEffect(iprop, userNotifyInstanceProp)});
        }
      }
      if (options.forwardHostProp && template.__dataHost) {
        for (let hprop in hostProps) {
          klass.prototype._addPropertyEffect(hprop,
            klass.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,
            {fn: createNotifyHostPropEffect()});
        }
      }
    }