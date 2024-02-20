function endTransaction() {
      tx.finalizeName(null) // Use existing partial name.
      tx.end()
    }