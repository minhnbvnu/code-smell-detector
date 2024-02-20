function handler3() {
      const transaction3 = tracer.getTransaction()
      const root3 = transaction3.trace.root

      t.equal(root.name, 'ROOT')
      t.equal(root3, contextManager.getContext())
      t.ok(transaction3)
      t.not(tracer.getTransaction(), transaction)
      t.not(contextManager.getContext(), root)
    }