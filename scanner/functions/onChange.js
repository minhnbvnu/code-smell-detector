function onChange(cur, prev) {
        t.ok(cur.mtime > prev.mtime, 'modified date incremented')
        t.ok(cur.size > prev.size, 'content modified')

        t.equal(agent.getTransaction(), trans, 'should preserve transaction')
        t.equal(trans.trace.root.children.length, 0, 'should not create any segments')
        fs.unwatchFile(name, onChange)
      }