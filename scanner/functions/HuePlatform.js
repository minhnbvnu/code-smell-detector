function HuePlatform (log, configJson, homebridge) {
  this.log = log
  this.api = homebridge
  this.packageJson = packageJson
  this.configJson = configJson
  const my = new MyHomeKitTypes(homebridge)
  const eve = new EveHomeKitTypes(homebridge)
  HueBridgeModule.setHomebridge(homebridge, my, eve)
  homebridge.on('shutdown', () => { this._shuttingDown = true })
  process.on('exit', () => { this.log('goodbye') })
  this.identify()

  const usernames = []
  for (const bridgeId in this.configJson.users) {
    usernames.push(this.configJson.users[bridgeId])
  }
  this.log.debug(
    'config.json: %s',
    this.maskUsernames(usernames, this.maskConfigJson(this.configJson))
  )

  this.config = {
    anyOn: true,
    brightnessAdjustment: 100,
    effects: true,
    excludeSensorTypes: [],
    forceHttp: false,
    heartrate: 5,
    hosts: [],
    lowBattery: 25,
    homebridgeDeconz: '',
    homebridgeHue2: '',
    nativeHomeKitLights: true,
    nativeHomeKitSensors: true,
    resetTimeout: 500,
    resource: true,
    timeout: 5,
    users: {},
    waitTimePut: 50,
    waitTimePutGroup: 1000,
    waitTimeResend: 300,
    waitTimeUpdate: 20
  }
  const optionParser = new OptionParser(this.config, true)
  optionParser
    .stringKey('name')
    .stringKey('platform')
    .boolKey('anyOn')
    .intKey('brightnessAdjustment', 10, 100)
    .boolKey('configuredName')
    .boolKey('effects')
    .boolKey('excludeLightSensors')
    .arrayKey('excludeSensorTypes')
    .boolKey('forceEveWeather')
    .boolKey('forceHttp')
    .boolKey('groups')
    .boolKey('group0')
    .intKey('heartrate', 1, 30)
    .arrayKey('hosts')
    .boolKey('hueDimmerRepeat')
    .boolKey('hueMotionTemperatureHistory')
    .stringKey('homebridgeDeconz')
    .stringKey('homebridgeHue2')
    .boolKey('lights')
    .boolKey('lightSensors')
    .boolKey('linkButton')
    .intKey('lowBattery', 0, 100)
    .boolKey('nativeHomeKitLights')
    .boolKey('nativeHomeKitSensors')
    .boolKey('noDeconz')
    .boolKey('noResponse')
    .boolKey('ownResourcelinks')
    .intKey('parallelRequests', 1, 30)
    .intKey('resetTimeout', 10, 2000)
    .boolKey('resource')
    .boolKey('rooms')
    .boolKey('rules')
    .boolKey('scenes')
    .boolKey('scenesAsSwitch')
    .boolKey('schedules')
    .boolKey('sensors')
    .boolKey('stealth')
    .intKey('timeout', 5, 30)
    .objectKey('users')
    .intKey('waitTimePut', 0, 50)
    .intKey('waitTimePutGroup', 0, 1000)
    .intKey('waitTimeResend', 100, 1000)
    .intKey('waitTimeUpdate', 0, 500)
    .boolKey('wallSwitch')
    .on('userInputError', (error) => {
      this.log.warn('config.json: %s', formatError(error))
    })
  try {
    optionParser.parse(configJson)
    this.config.brightnessAdjustment /= 100
    const excludeSensorTypes = this.config.excludeSensorTypes
    this.config.excludeSensorTypes = {}
    for (const type of excludeSensorTypes) {
      this.config.excludeSensorTypes[type] = true
      switch (type) {
        case 'ZLLPresence':
          this.config.excludeSensorTypes.ZHAPresence = true
          break
        case 'ZLLLightLevel':
          this.config.excludeSensorTypes.ZHALightLevel = true
          break
        case 'ZLLTemperature':
          this.config.excludeSensorTypes.ZHATemperature = true
          break
        case 'ZLLRelativeRotary':
          this.config.excludeSensorTypes.ZHARelativeRotary = true
          break
        case 'ZLLSwitch':
          this.config.excludeSensorTypes.ZHASwitch = true
          break
        default:
          break
      }
    }
  } catch (error) {
    this.log.error(error)
    process.kill(process.pid, 'SIGTERM')
    return
  }

  this.log.debug(
    'config: %s',
    this.maskUsernames(usernames, this.maskConfigJson(this.config))
  )

  this.hueDiscovery = new HueDiscovery({
    forceHttp: this.config.forceHttp,
    timeout: this.config.timeout
  })
  this.hueDiscovery
    .on('error', (error) => {
      this.log(
        '%s: request %d: %s %s', this.maskHost(error.request.name),
        error.request.id, error.request.method, error.request.resource
      )
      this.log.warn(
        '%s: request %d: %s', error.request.name, error.request.id,
        formatError(error)
      )
    })
    .on('request', (request) => {
      this.log.debug(
        '%s: request %d: %s %s', this.maskHost(request.name),
        request.id, request.method, request.resource
      )
    })
    .on('response', (response) => {
      this.log.debug(
        '%s: request %d: %d %s', this.maskHost(response.request.name),
        response.request.id, response.statusCode, response.statusMessage
      )
    })
    .on('found', (name, id, address) => {
      this.log.debug('%s: found %s at %s', name, id, this.maskHost(address))
    })
    .on('searching', (host) => {
      this.log.debug('upnp: listening on %s', host)
    })
    .on('searchDone', () => { this.log.debug('upnp: search done') })

  this.bridgeMap = {}
}