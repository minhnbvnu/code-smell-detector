function isTopLevelScoped() {
      return context.getScope().block.type === 'Program'
    }