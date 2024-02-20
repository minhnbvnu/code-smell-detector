function getCategory (e, plugin) {
      for (const key in categories) {
        if (e.msg.includes(key) && plugin.name.includes(categories[key])) {
          return '功能名称: '
        }
      }
      return ''
    }