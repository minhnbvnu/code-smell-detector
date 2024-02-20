function HueBridge (platform, host, bridge) {
  this.log = platform.log
  this.platform = platform
  this.host = host
  this.bridge = bridge
  this.hostname = host.split(':')[0]
  this.name = this.hostname
  this.type = 'bridge'
  this.defaultTransitiontime = 0.4
  this.state = {
    heartrate: this.platform.config.heartrate,
    transitiontime: this.defaultTransitiontime,
    bri: 1,
    request: 0,
    lights: 0,
    groups: 0,
    group0: 0,
    sensors: 0,
    schedules: 0,
    rules: 0
  }
  this.serviceList = []
  this.lights = {}
  this.groups = {}
  this.sensors = {}
  this.schedules = {}
  this.rules = {}

  this.whitelist = {
    lights: {},
    groups: {},
    scenes: {},
    sensors: {},
    schedules: {},
    rules: {}
  }
  this.blacklist = {
    lights: {},
    groups: {},
    scenes: {},
    sensors: {},
    schedules: {},
    rules: {}
  }
  this.multiclip = {}
  this.multilight = {}
  this.splitlight = {}
  this.outlet = {
    groups: {},
    lights: {}
  }
  this.switch = {
    groups: {},
    lights: {}
  }
  this.valve = {}
  this.venetianblind = {}
  this.wallswitch = {}
}