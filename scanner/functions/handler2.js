function handler2() {
      t.equal(tracer.getTransaction(), transaction)
      t.equal(root, contextManager.getContext())
    }