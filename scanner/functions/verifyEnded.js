function verifyEnded(root, tx) {
      for (let i = 0, len = root.children.length; i < len; i++) {
        const segment = root.children[i]
        t.ok(segment.timer.hasEnd(), util.format('verify %s (%s) has ended', segment.name, tx.id))
        if (segment.children) {
          verifyEnded(segment, tx)
        }
      }
    }