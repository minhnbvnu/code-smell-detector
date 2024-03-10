function HueLight (accessory, id, obj, type = 'light') {
  this.accessory = accessory
  this.id = id
  this.obj = obj
  this.type = type
  this.log = this.accessory.log
  this.serialNumber = this.accessory.serialNumber
  this.bridge = this.accessory.bridge
  this.name = obj.name
  this.resource = '/' + this.type + 's/' + this.id
  this.key = this.type === 'group' ? 'action' : 'state'
  this.resourcePath = this.resource + '/' + this.key
  this.desiredState = {}
  this.deferrals = []
  this.effectServices = []
  for (const key in this.obj.action) {
    if (key !== 'on') {
      this.obj.state[key] = this.obj.action[key]
    }
  }
  this.hk = {}

  this.setConfig()
  this.infoService = this.accessory.getInfoService(this)
  if (this.config.windowCovering) {
    this.service = new Service.WindowCovering(this.name, this.subtype)
    this.service.getCharacteristic(Characteristic.TargetPosition)
      .on('set', this.setPosition.bind(this))
      .setProps({ minStep: 5 })
    this.checkLift(this.obj.state.lift)
    this.service.getCharacteristic(Characteristic.HoldPosition)
      .on('set', this.setHoldPosition.bind(this))
      .setValue(false)
    if (this.config.venetianblind) {
      this.service.addOptionalCharacteristic(my.Characteristics.CloseUpwards)
      this.service.getCharacteristic(my.Characteristics.CloseUpwards)
        .on('set', this.setCloseUpwards.bind(this))
    }
    if (this.accessory.model === 'lumi.curtain.acn002') {
      this.service.addOptionalCharacteristic(my.Characteristics.PositionChange)
      this.service.getCharacteristic(my.Characteristics.PositionChange)
        .setValue(0)
        .on('set', this.setPositionChange.bind(this))
      this.config.maxSpeed = 2
    }
    if (this.config.tilt) {
      this.service.getCharacteristic(Characteristic.TargetHorizontalTiltAngle)
        .on('set', this.setTilt.bind(this))
        .setProps({ minStep: 5 })
      this.checkTilt(this.obj.state.tilt)
    }
  } else if (this.config.doorLock) {
    this.service = new Service.LockMechanism(this.name, this.subtype)
    this.service.getCharacteristic(Characteristic.LockCurrentState)
      .setValue(Characteristic.LockCurrentState.UNSECURED)
    this.checkOn(this.obj.state.on)
    this.hk.lockTargetState = this.obj.state.on
      ? Characteristic.LockTargetState.SECURED
      : Characteristic.LockTargetState.UNSECURED
    this.service.getCharacteristic(Characteristic.LockTargetState)
      .updateValue(this.hk.lockTargetState)
      .on('set', this.setLockTargetState.bind(this))
  } else if (!this.config.on) { // Warning device
    this.service = new Service.Outlet(this.name, this.subtype)
    this.service.getCharacteristic(Characteristic.OutletInUse)
      .updateValue(1)
    this.service.getCharacteristic(Characteristic.On)
      .on('set', this.setWarning.bind(this))
    this.checkOn(this.obj.state.on)
    this.hk.duration = 0
    this.service.addOptionalCharacteristic(Characteristic.SetDuration)
    this.service.getCharacteristic(Characteristic.SetDuration)
      .updateValue(this.hk.duration)
      .on('set', this.setDuration.bind(this))
    this.hk.mute = false
    this.service.addOptionalCharacteristic(Characteristic.Mute)
    this.service.getCharacteristic(Characteristic.Mute)
      .updateValue(this.hk.mute)
      .on('set', this.setMute.bind(this))
  } else {
    if (this.config.outlet) {
      this.service = new Service.Outlet(this.name, this.subtype)
      this.service.getCharacteristic(Characteristic.OutletInUse)
        .updateValue(1)
    } else if (this.config.switch) {
      this.service = new Service.Switch(this.name, this.subtype)
    } else if (this.config.valve) {
      this.service = new Service.Valve(this.name, this.subtype)
      this.service.getCharacteristic(Characteristic.InUse)
        .updateValue(0)
      this.service.getCharacteristic(Characteristic.ValveType)
        .updateValue(Characteristic.ValveType.GENERIC_VALVE)
    } else {
      this.service = new Service.Lightbulb(this.name, this.subtype)
    }
    if (this.config.valve) {
      this.service.getCharacteristic(Characteristic.Active)
        .on('get', this.getActive.bind(this))
        .on('set', this.setActive.bind(this))
      this.checkActive(this.obj.state.on)
      this.hk.duration = 0
      this.service.getCharacteristic(Characteristic.SetDuration)
        .setProps({ maxValue: 4 * 3600 })
        .updateValue(this.hk.duration)
        .on('set', this.setDuration.bind(this))
      this.hk.autoInActive = 0
      this.service.getCharacteristic(Characteristic.RemainingDuration)
        .setProps({ maxValue: 4 * 3600 })
        .updateValue(0)
        .on('get', this.getRemainingDuration.bind(this))
    } else {
      this.service.getCharacteristic(Characteristic.On)
        .on('get', this.getOn.bind(this))
        .on('set', this.setOn.bind(this))
      if (this.type === 'group') {
        if (this.bridge.platform.config.anyOn) {
          this.anyOnKey = 'any_on'
          this.AnyOnCharacteristic = my.Characteristics.AnyOn
          this.service.addOptionalCharacteristic(this.AnyOnCharacteristic)
          this.service.getCharacteristic(this.AnyOnCharacteristic)
            .on('set', this.setAnyOn.bind(this))
          this.checkAllOn(this.obj.state.all_on)
        } else {
          this.anyOnKey = 'on'
          this.AnyOnCharacteristic = Characteristic.On
          this.checkAllOn = () => {}
        }
        this.checkAnyOn(this.obj.state.any_on)
        if (this.config.streaming) {
          this.service.addOptionalCharacteristic(my.Characteristics.Streaming)
          this.service.getCharacteristic(my.Characteristics.Streaming)
            .on('set', this.setStreaming.bind(this))
          this.checkStreaming(this.obj.stream.active)
        }
      } else {
        this.checkOn(this.obj.state.on)
      }
    }
    if (this.config.bri) {
      this.service.getCharacteristic(Characteristic.Brightness)
        .on('set', this.setBri.bind(this))
      this.checkBri(this.obj.state.bri)

      this.service.addOptionalCharacteristic(my.Characteristics.BrightnessChange)
      this.service.getCharacteristic(my.Characteristics.BrightnessChange)
        .updateValue(0)
        .on('set', this.setBriChange.bind(this))
    }
    if (this.config.ct) {
      this.colorTemperatureCharacteristic = Characteristic.ColorTemperature
      this.service.addOptionalCharacteristic(Characteristic.ColorTemperature)
      this.service.getCharacteristic(Characteristic.ColorTemperature)
        .updateValue(this.config.minCt)
        .setProps({
          minValue: this.config.minCt,
          maxValue: this.config.maxCt
        })
        .on('set', this.setCt.bind(this))
      this.checkCt(this.obj.state.ct)

      this.service.addOptionalCharacteristic(
        Characteristic.SupportedCharacteristicValueTransitionConfiguration
      )
      this.service.getCharacteristic(
        Characteristic.SupportedCharacteristicValueTransitionConfiguration
      )
        .on('get', this.getSupportedTransitionConfiguration.bind(this))
      this.service.addOptionalCharacteristic(
        Characteristic.CharacteristicValueTransitionControl
      )
      this.service.getCharacteristic(
        Characteristic.CharacteristicValueTransitionControl
      )
        .on('get', this.getTransitionControl.bind(this))
        .on('set', this.setTransitionControl.bind(this))
      this.service.addOptionalCharacteristic(
        Characteristic.CharacteristicValueActiveTransitionCount
      )
      this.service.getCharacteristic(
        Characteristic.CharacteristicValueActiveTransitionCount
      )
        .updateValue(0)
    }
    if (this.config.xy || this.config.hs) {
      this.service.getCharacteristic(Characteristic.Hue)
        .on('set', this.setHue.bind(this))
      this.service.getCharacteristic(Characteristic.Saturation)
        .on('set', this.setSat.bind(this))
      if (this.config.xy) {
        this.checkXy(this.obj.state.xy)
      } else {
        this.checkHue(this.obj.state.hue)
        this.checkSat(this.obj.state.sat)
      }
    }
    if (this.config.colorLoop) {
      this.service.addOptionalCharacteristic(my.Characteristics.ColorLoop)
      this.service.getCharacteristic(my.Characteristics.ColorLoop)
        .on('set', this.setColorLoop.bind(this))
      if (this.config.colorLoopSpeed) {
        this.service.addOptionalCharacteristic(my.Characteristics.ColorLoopSpeed)
        this.service.getCharacteristic(my.Characteristics.ColorLoopSpeed)
          .updateValue(25)
          .on('set', this.setColorLoopSpeed.bind(this))
        this.hk.colorLoopSpeed = 25
      }
    }
    if (this.config.effects != null) {
      let labelIndex = 1
      this.service.addOptionalCharacteristic(Characteristic.ServiceLabelIndex)
      this.service.getCharacteristic(Characteristic.ServiceLabelIndex)
        .updateValue(labelIndex++)

      let i = 0
      for (const effect of this.config.effects) {
        const name = this.name + ' ' + effect
        const service = new Service.Switch(name, this.subtype + '-E' + i)
        service.getCharacteristic(Characteristic.On)
          .on('set', this.setEffect.bind(this, i))
        this.service.addOptionalCharacteristic(Characteristic.ConfiguredName)
        service.getCharacteristic(Characteristic.ConfiguredName)
          .updateValue(name)
        service.addOptionalCharacteristic(Characteristic.ServiceLabelIndex)
        service.getCharacteristic(Characteristic.ServiceLabelIndex)
          .updateValue(labelIndex++)
        this.effectServices.push(service)
        i++
      }
      if (this.config.effectSpeed) {
        this.service.addOptionalCharacteristic(my.Characteristics.EffectSpeed)
        this.service.getCharacteristic(my.Characteristics.EffectSpeed)
          .updateValue(50)
          .on('set', this.setEffectSpeed.bind(this))
        this.hk.effectSpeed = 50
        this.hk.effectColours = []
        for (let i = 0; i <= 5; i++) {
          const name = this.name + ' Effect Color ' + (i + 1)
          const service = new Service.Lightbulb(name, this.subtype + '-C' + i)
          service.getCharacteristic(Characteristic.On)
            .updateValue(1)
            .on('set', this.setEffectOn.bind(this, i))
          service.getCharacteristic(Characteristic.Hue)
            .updateValue(i * 60)
            .on('set', this.setEffectHue.bind(this, i))
          service.getCharacteristic(Characteristic.Saturation)
            .updateValue(100)
            .on('set', this.setEffectSat.bind(this, i))
          this.hk.effectColours.push({ on: 1, hue: i * 60, sat: 100 })
          this.service.addOptionalCharacteristic(Characteristic.ConfiguredName)
          service.getCharacteristic(Characteristic.ConfiguredName)
            .updateValue(name)
          service.addOptionalCharacteristic(Characteristic.ServiceLabelIndex)
          service.getCharacteristic(Characteristic.ServiceLabelIndex)
            .updateValue(labelIndex++)
          this.effectServices.push(service)
        }
      }
      this.checkEffect(this.obj.state.effect)
    }
  }
  if (this.bridge.platform.config.configuredName) {
    this.service.addCharacteristic(Characteristic.ConfiguredName)
    // this.service.addOptionalCharacteristic(Characteristic.ConfiguredName)
    // this.service.getCharacteristic(Characteristic.ConfiguredName)
    //   .on('set', this.setName.bind(this))
    // this.checkName(this.obj.name)
  }
  if (this.type === 'light') {
    this.service.addOptionalCharacteristic(Characteristic.StatusFault)
    this.checkReachable(this.obj.state.reachable)
    // if (this.bridge.config.nativeHomeKitLights) {
    //   this.service.addOptionalCharacteristic(my.Characteristics.UniqueID)
    //   this.service.getCharacteristic(my.Characteristics.UniqueID)
    //     .updateValue(this.obj.uniqueid)
    // }
  }
  if (this.bridge.platform.config.resource) {
    this.service.addOptionalCharacteristic(my.Characteristics.Resource)
    this.service.getCharacteristic(my.Characteristics.Resource)
      .updateValue(this.resource)
  }
  if (this.config.speed) {
    if (this.config.windowCovering) {
      this.service.addOptionalCharacteristic(my.Characteristics.MotorSpeed)
      this.service.getCharacteristic(my.Characteristics.MotorSpeed)
        .setProps({
          unit: '',
          minValue: 0,
          maxValue: this.config.maxSpeed,
          minStep: 1
        })
        .on('set', this.setMotorSpeed.bind(this))
    } else {
      this.fanService = new Service.Fan(this.name, this.subtype)
      this.fanService.getCharacteristic(Characteristic.RotationSpeed)
        .setProps({
          minValue: 0,
          maxValue: 100,
          minStep: 25
        })
        .on('set', this.setFanSpeed.bind(this))
    }
    this.checkSpeed(this.obj.state.speed)
  }
  if (this.config.lastBoot) {
    this.service.addOptionalCharacteristic(my.Characteristics.LastBoot)
    this.checkLastBoot(this.obj.lastannounced)
  }
  if (this.config.lastSeen) {
    this.service.addOptionalCharacteristic(my.Characteristics.LastSeen)
    this.checkLastSeen(this.obj.lastseen)
  }
}