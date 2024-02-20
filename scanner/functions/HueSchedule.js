function HueSchedule (bridge, id, obj, type) {
  this.log = bridge.log
  this.bridge = bridge
  this.name = obj.name
  this.type = type || 'schedule'
  this.resource = '/' + this.type + 's/' + id
  this.serialNumber = bridge.serialNumber + '/' + this.resource
  // jshint -W106
  this.uuid_base = this.serialNumber
  // jshint +W106
  this.obj = obj
  this.refresh()

  this.infoService = new Service.AccessoryInformation()
  this.infoService
    .updateCharacteristic(Characteristic.Manufacturer, this.bridge.philips)
    .updateCharacteristic(
      Characteristic.Model, type === 'schedule' ? 'Schedule' : 'Rule'
    )
    .updateCharacteristic(Characteristic.SerialNumber, this.serialNumber)
    .updateCharacteristic(
      Characteristic.FirmwareRevision, this.bridge.version
    )
  this.service = new my.Services.Resource(this.name, this.resource)
  this.service.getCharacteristic(my.Characteristics.Enabled)
    .updateValue(this.hk.enabled)
    .on('set', this.setEnabled.bind(this))
  if (this.type === 'rule') {
    this.service
      .updateCharacteristic(my.Characteristics.LastTriggered, this.hk.lasttriggered)
      .updateCharacteristic(
        my.Characteristics.TimesTriggered, this.hk.timestriggered
      )
  }
  this.service
    .updateCharacteristic(Characteristic.StatusActive, this.hk.enabled)
  if (this.bridge.platform.config.resource) {
    this.service
      .updateCharacteristic(my.Characteristics.Resource, this.resource)
    this.service.getCharacteristic(my.Characteristics.Resource)
      .updateValue(this.resource)
  }
}