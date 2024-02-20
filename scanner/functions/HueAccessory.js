function HueAccessory (bridge, serialNumber, isMulti = false) {
  this.log = bridge.log
  this.bridge = bridge
  this.serialNumber = serialNumber
  // jshint -W106
  this.uuid_base = this.serialNumber
  // jshint +W106
  this.isMulti = isMulti
  this.resources = {
    sensors: { other: [] },
    lights: { other: [] }
  }
  this.sensors = {}
  this.lights = {}
  this.groups = {}
  this.serviceList = []
  this.state = {}
  this.hk = {}
}