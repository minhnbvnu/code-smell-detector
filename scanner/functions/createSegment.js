function createSegment(name, recorder, _parent) {
  const parent = _parent || this.getSegment()
  if (!parent || !parent.transaction.isActive()) {
    logger.trace(
      {
        hasParent: !!parent,
        transactionActive: parent && parent.transaction.isActive()
      },
      'Not creating segment %s, no parent or active transaction available.',
      name
    )
    return null
  }
  return parent.add(name, recorder)
}