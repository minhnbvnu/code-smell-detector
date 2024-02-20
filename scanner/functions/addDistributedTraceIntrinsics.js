function addDistributedTraceIntrinsics(attrs) {
  this._calculatePriority()

  // *always* add these if DT flag is enabled.
  attrs.traceId = this.traceId
  attrs.guid = this.id
  attrs.priority = this.priority

  attrs.sampled = !!this.sampled

  // add the rest only if payload was received
  if (this.parentType) {
    attrs['parent.type'] = this.parentType
  }

  if (this.parentApp) {
    attrs['parent.app'] = this.parentApp
  }

  if (this.parentAcct) {
    attrs['parent.account'] = this.parentAcct
  }

  if (this.parentTransportType) {
    attrs['parent.transportType'] = this.parentTransportType
  }

  if (this.parentTransportDuration != null) {
    attrs['parent.transportDuration'] = this.parentTransportDuration
  }
}