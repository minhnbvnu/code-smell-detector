function autopopulate(next) {
  this.populate({ path: 'location', select: 'name url -_id' })
  this.populate({ path: 'origin', select: 'name url -_id' })
  next()
}