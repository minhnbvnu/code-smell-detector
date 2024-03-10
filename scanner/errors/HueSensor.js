function HueSensor (accessory, id, obj) {
  this.accessory = accessory
  this.id = id
  this.obj = obj
  this.bridge = this.accessory.bridge
  this.log = this.accessory.log
  this.serialNumber = this.accessory.serialNumber
  this.name = this.obj.name
  this.hk = {}
  this.resource = '/sensors/' + id
  this.serviceList = []
  this.noEventStream = !this.bridge.hueClient.isHue2

  if (this.obj.type[0] === 'Z') {
    // Zigbee sensor.
    this.manufacturer = this.obj.manufacturername
    this.model = this.obj.modelid
    this.endpoint = this.obj.uniqueid.split('-')[1]
    this.cluster = this.obj.uniqueid.split('-')[2]
    this.subtype = this.endpoint + '-' + this.cluster
    this.version = this.obj.swversion
  } else {
    // Hue bridge internal sensor.
    this.manufacturer = this.bridge.manufacturer
    if (this.accessory.isMulti) {
      this.model = 'MultiCLIP'
      this.subtype = this.id
    } else if (
      this.obj.manufacturername === 'homebridge-hue' &&
      this.obj.modelid === this.obj.type &&
      this.obj.uniqueid.split('-')[1] === this.id
    ) {
      // Combine multiple CLIP sensors into one accessory.
      this.model = 'MultiCLIP'
      this.subtype = this.id
    } else {
      this.model = this.obj.type
    }
    this.version = this.bridge.version
  }
  this.infoService = this.accessory.getInfoService(this)

  let durationKey = 'duration'
  let temperatureHistory = 'weather'
  let heatValue = 'auto'
  let presenceevent = false
  switch (this.obj.type) {
    case 'ZGPSwitch':
    case 'ZLLSwitch':
    case 'ZHASwitch': {
      this.buttonMap = {}
      let namespace = Characteristic.ServiceLabelNamespace.ARABIC_NUMERALS
      let homekitValue = (v) => { return Math.floor(v / 1000) }
      let homekitAction = hkZLLSwitchAction

      switch (this.obj.manufacturername) {
        case 'Bitron Home':
          switch (this.obj.modelid) {
            case '902010/23': // Bitron remote, see #639.
              namespace = Characteristic.ServiceLabelNamespace.DOTS
              this.createButton(1, 'DimUp', SINGLE)
              this.createButton(2, 'On', SINGLE)
              this.createButton(3, 'Off', SINGLE)
              this.createButton(4, 'DimDown', SINGLE)
              break
            default:
              break
          }
          break
        case 'Busch-Jaeger':
          switch (this.obj.modelid) {
            case 'RM01': // Busch-Jaeger Light Link control element (mains-powered)
            case 'RB01': // Busch-Jaeger Light Link wall-mounted transmitter
              if (this.endpoint === '0a') {
                this.createButton(1, 'Button 1', SINGLE_LONG)
                this.createButton(2, 'Button 2', SINGLE_LONG)
              } else if (this.endpoint === '0b') {
                this.createButton(3, 'Button 3', SINGLE_LONG)
                this.createButton(4, 'Button 4', SINGLE_LONG)
              } else if (this.endpoint === '0c') {
                this.createButton(5, 'Button 5', SINGLE_LONG)
                this.createButton(6, 'Button 6', SINGLE_LONG)
              } else if (this.endpoint === '0d') {
                this.createButton(7, 'Button 7', SINGLE_LONG)
                this.createButton(8, 'Button 8', SINGLE_LONG)
              }
              break
            default:
              break
          }
          break
        case 'Echostar':
          switch (this.obj.modelid) {
            case 'Bell':
              this.createButton(1, 'Front Doorbell', SINGLE)
              this.createButton(2, 'Rear Doorbell', SINGLE)
              break
            default:
              break
          }
          break
        case 'ELKO':
          switch (this.obj.modelid) {
            case 'ElkoDimmerRemoteZHA': // ELKO ESH 316 Endevender RF, see #922.
              this.createButton(1, 'Press', SINGLE)
              this.createButton(2, 'Dim Up', SINGLE)
              this.createButton(3, 'Dim Down', SINGLE)
              break
            default:
              break
          }
          break
        case 'Heiman':
          switch (this.obj.modelid) {
            case 'RC-EF-3.0':
              namespace = Characteristic.ServiceLabelNamespace.DOTS
              this.createButton(1, 'HomeMode', SINGLE)
              this.createButton(2, 'Disarm', SINGLE)
              this.createButton(3, 'SOS', SINGLE)
              this.createButton(4, 'Arm', SINGLE)
              break
            default:
              break
          }
          break
        case 'IKEA of Sweden':
          switch (this.obj.modelid) {
            case 'Remote Control N2':
              this.createButton(1, 'DimUp', SINGLE_LONG)
              this.createButton(2, 'DimDown', SINGLE_LONG)
              this.createButton(3, 'Previous', SINGLE_LONG)
              this.createButton(4, 'Next', SINGLE_LONG)
              break
            case 'SYMFONISK Sound Controller':
              this.createButton(1, 'Button', SINGLE_DOUBLE_LONG)
              if (this.obj.mode === 1) {
                this.createButton(2, 'Turn Right', LONG)
                this.createButton(3, 'Turn Left', LONG)
              } else {
                this.createButton(2, 'Turn Right', SINGLE)
                this.createButton(3, 'Turn Left', SINGLE)
              }
              break
            case 'TRADFRI SHORTCUT Button':
              this.createButton(1, 'Button', SINGLE_DOUBLE_LONG)
              break
            case 'TRADFRI on/off switch':
              this.createButton(1, 'On', SINGLE_LONG)
              this.createButton(2, 'Off', SINGLE_LONG)
              break
            case 'TRADFRI open/close remote':
              this.createButton(1, 'Open', SINGLE_LONG)
              this.createButton(2, 'Close', SINGLE_LONG)
              break
            case 'TRADFRI remote control':
              this.createButton(1, 'On/Off', SINGLE)
              this.createButton(2, 'Dim Up', SINGLE_LONG)
              this.createButton(3, 'Dim Down', SINGLE_LONG)
              this.createButton(4, 'Previous', SINGLE_LONG)
              this.createButton(5, 'Next', SINGLE_LONG)
              break
            case 'TRADFRI wireless dimmer':
              if (this.obj.mode === 1) {
                this.createButton(1, 'Turn Right', SINGLE_LONG)
                this.createButton(2, 'Turn Left', SINGLE_LONG)
              } else {
                this.createButton(1, 'On', SINGLE)
                this.createButton(2, 'Dim Up', SINGLE)
                this.createButton(3, 'Dim Down', SINGLE)
                this.createButton(4, 'Off', SINGLE)
              }
              break
            default:
              break
          }
          break
        case 'Insta':
          switch (this.obj.modelid) {
            case 'HS_4f_GJ_1': // Gira/Jung Light Link hand transmitter
            case 'WS_3f_G_1': // Gira Light Link wall transmitter
            case 'WS_4f_J_1': // Jung Light Link wall transmitter
              this.createButton(1, 'Off', SINGLE_DOUBLE_LONG)
              this.createButton(2, 'On', SINGLE_DOUBLE_LONG)
              this.createButton(3, 'Scene 1', SINGLE)
              this.createButton(4, 'Scene 2', SINGLE)
              this.createButton(5, 'Scene 3', SINGLE)
              this.createButton(6, 'Scene 4', SINGLE)
              if (this.obj.modelid !== 'WS_3f_G_1') {
                this.createButton(7, 'Scene 5', SINGLE)
                this.createButton(8, 'Scene 6', SINGLE)
              }
              break
            default:
              break
          }
          break
        case 'LDS':
          switch (this.obj.modelid) {
            case 'ZBT-DIMController-D0800':
              this.createButton(1, 'On/Off', SINGLE)
              this.createButton(2, 'DimUp', SINGLE_LONG)
              this.createButton(3, 'DimDown', SINGLE_LONG)
              this.createButton(4, 'Scene', SINGLE_LONG)
              break
            default:
              break
          }
          break
        case 'LIDL Livarno Lux':
          switch (this.obj.modelid) {
            case 'HG06323':
              this.createButton(1, 'On', SINGLE_DOUBLE_LONG)
              this.createButton(2, 'DimUp', SINGLE_LONG)
              this.createButton(3, 'DimDown', SINGLE_LONG)
              this.createButton(4, 'Off', SINGLE)
              break
            default:
              break
          }
          break
        case 'LUMI':
          switch (this.obj.modelid) {
            case 'lumi.remote.b1acn01':
            case 'lumi.remote.b186acn01':
            case 'lumi.remote.b186acn02':
              this.createButton(1, 'Left', SINGLE_DOUBLE_LONG)
              break
            case 'lumi.remote.b28ac1':
            case 'lumi.remote.b286acn01':
            case 'lumi.remote.b286acn02':
              this.createButton(1, 'Left', SINGLE_DOUBLE_LONG)
              this.createButton(2, 'Right', SINGLE_DOUBLE_LONG)
              this.createButton(3, 'Both', SINGLE_DOUBLE_LONG)
              break
            case 'lumi.remote.b286opcn01': // Xiaomi Aqara Opple, see #637.
            case 'lumi.remote.b486opcn01': // Xiaomi Aqara Opple, see #637.
            case 'lumi.remote.b686opcn01': // Xiaomi Aqara Opple, see #637.
              this.createButton(1, '1', SINGLE_DOUBLE_LONG)
              this.createButton(2, '2', SINGLE_DOUBLE_LONG)
              if (this.obj.modelid !== 'lumi.remote.b286opcn01') {
                this.createButton(3, '3', SINGLE_DOUBLE_LONG)
                this.createButton(4, '4', SINGLE_DOUBLE_LONG)
                if (this.obj.modelid === 'lumi.remote.b686opcn01') {
                  this.createButton(5, '5', SINGLE_DOUBLE_LONG)
                  this.createButton(6, '6', SINGLE_DOUBLE_LONG)
                }
              }
              break
            case 'lumi.ctrl_ln1.aq1':
            case 'lumi.sensor_86sw1': // Xiaomi wall switch (single button).
            case 'lumi.switch.l1aeu1': // Xiaomi Aqara H1, see #1149.
            case 'lumi.switch.n1aeu1': // Xiaomi Aqara H1, see #1149.
              this.createButton(1, 'Button', SINGLE_DOUBLE)
              break
            case 'lumi.ctrl_ln2.aq1':
            case 'lumi.sensor_86sw2': // Xiaomi wall switch (two buttons).
            case 'lumi.switch.l2aeu1': // Xiaomi Aqara H2, see #1149.
            case 'lumi.switch.n2aeu1': // Xiaomi Aqara H2, see #1149.
              this.createButton(1, 'Left', SINGLE_DOUBLE)
              this.createButton(2, 'Right', SINGLE_DOUBLE)
              this.createButton(3, 'Both', SINGLE_DOUBLE)
              break
            case 'lumi.sensor_cube':
            case 'lumi.sensor_cube.aqgl01':
              if (this.endpoint === '02') {
                this.createButton(1, 'Side 1', SINGLE_DOUBLE_LONG)
                this.createButton(2, 'Side 2', SINGLE_DOUBLE_LONG)
                this.createButton(3, 'Side 3', SINGLE_DOUBLE_LONG)
                this.createButton(4, 'Side 4', SINGLE_DOUBLE_LONG)
                this.createButton(5, 'Side 5', SINGLE_DOUBLE_LONG)
                this.createButton(6, 'Side 6', SINGLE_DOUBLE_LONG)
                this.createButton(7, 'Cube', SINGLE_DOUBLE_LONG)
                homekitAction = (v) => {
                  if (v === 7000) { // Wakeup
                    return Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS
                  } else if (v === 7007) { // Shake
                    return Characteristic.ProgrammableSwitchEvent.LONG_PRESS
                  } else if (v === 7008) { // Drop
                    return Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS
                  } else if (v % 1000 === 0) { // Push
                    return Characteristic.ProgrammableSwitchEvent.LONG_PRESS
                  } else if (v % 1000 === Math.floor(v / 1000)) { // Double tap
                    return Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS
                  } else { // Flip
                    return Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS
                  }
                }
              } else if (this.endpoint === '03') {
                this.createButton(8, 'Turn Right', SINGLE_DOUBLE_LONG)
                this.createButton(9, 'Turn Left', SINGLE_DOUBLE_LONG)
                homekitValue = (v) => { return v > 0 ? 8 : 9 }
                homekitAction = (v) => {
                  return Math.abs(v) < 4500
                    ? Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS
                    : Math.abs(v) < 9000
                      ? Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS
                      : Characteristic.ProgrammableSwitchEvent.LONG_PRESS
                }
              }
              break
            case 'lumi.sensor_switch': // Xiaomi Mi wireless switch
            case 'lumi.sensor_switch.aq2': // Xiaomi Aqara smart wireless switch
            case 'lumi.sensor_switch.aq3': // Xiaomi Aqara smart wireless switch with gyro
              this.createButton(1, 'Button', SINGLE_DOUBLE_LONG)
              break
            default:
              break
          }
          break
        case 'Lutron':
          switch (this.obj.modelid) {
            case 'LZL4BWHL01 Remote': // Lutron Pico, see 102.
              this.createButton(1, 'On', SINGLE)
              this.createButton(2, 'DimUp', LONG)
              this.createButton(3, 'DimDown', LONG)
              this.createButton(4, 'Off', SINGLE)
              break
            case 'Z3-1BRL': // Lutron Aurora, see #522.
              if (this.bridge.isHue) {
                this.createButton(1, 'Button', SINGLE_LONG)
              } else {
                this.createButton(1, 'Button', SINGLE)
                this.createButton(2, 'Turn Right', SINGLE)
                this.createButton(3, 'Turn Left', SINGLE)
              }
              break
            default:
              break
          }
          break
        case 'MLI':
          switch (this.obj.modelid) {
            case 'ZBT-Remote-ALL-RGBW': // Tint remote control by Müller-Licht see deconz-rest-plugin#1209
              this.createButton(1, 'On/Off', SINGLE)
              this.createButton(2, 'DimUp', SINGLE_LONG)
              this.createButton(3, 'DimDown', SINGLE_LONG)
              this.createButton(4, 'Warm', SINGLE)
              this.createButton(5, 'Cool', SINGLE)
              this.createButton(6, 'Colour Wheel', SINGLE)
              this.createButton(7, 'Work Light', SINGLE)
              this.createButton(8, 'Sunset', SINGLE)
              this.createButton(9, 'Party', SINGLE)
              this.createButton(10, 'Night Light', SINGLE)
              this.createButton(11, 'Campfire', SINGLE)
              this.createButton(12, 'Romance', SINGLE)
              break
            default:
              break
          }
          break
        case 'OSRAM':
          switch (this.obj.modelid) {
            case 'Lightify Switch Mini':
              this.createButton(1, 'Up', SINGLE_LONG)
              this.createButton(2, 'Down', SINGLE_LONG)
              this.createButton(3, 'Middle', SINGLE_LONG)
              break
            default:
              break
          }
          break
        case 'Philips':
        case 'Signify Netherlands B.V.': {
          const repeat = this.bridge.platform.config.hueDimmerRepeat
          const events = repeat ? SINGLE : SINGLE_LONG
          switch (this.obj.modelid) {
            case 'RDM001': // Hue wall switch module
            case 'RDM004': // Hue wall switch module
              switch (obj.config.devicemode) {
                case 'singlerocker':
                  this.createButton(1, 'Rocker 1', SINGLE)
                  break
                case 'singlepushbutton':
                  this.createButton(1, 'Push Button 1', events)
                  if (repeat) this.repeat = [1]
                  break
                case 'dualrocker':
                  this.createButton(1, 'Rocker 1', SINGLE)
                  this.createButton(2, 'Rocker 2', SINGLE)
                  break
                case 'dualpushbutton':
                  this.createButton(1, 'Push Button 1', events)
                  this.createButton(2, 'Push Button 2', events)
                  if (repeat) this.repeat = [1, 2]
                  break
                default:
                  break
              }
              break
            case 'RDM002': // Hue tap dial switch
              namespace = Characteristic.ServiceLabelNamespace.DOTS
              this.createButton(1, '1', events) // On/Off
              this.createButton(2, '2', events)
              this.createButton(3, '3', events)
              this.createButton(4, '4', events) // Hue
              if (repeat) this.repeat = [1, 2, 3, 4]
              break
            case 'ROM001': // Hue smart button
            case 'RDM003': // Hue smart button
              this.createButton(1, 'Button', events)
              if (repeat) this.repeat = [1]
              break
            case 'RWL020':
            case 'RWL021': // Hue dimmer switch
              this.createButton(1, 'On', SINGLE_LONG)
              this.createButton(2, 'Dim Up', events)
              this.createButton(3, 'Dim Down', events)
              this.createButton(4, 'Off', SINGLE_LONG)
              if (repeat) this.repeat = [2, 3]
              break
            case 'RWL022': // Hue dimmer switch (2021)
              this.createButton(1, 'On', SINGLE_LONG) // On/Off
              this.createButton(2, 'Dim Up', events)
              this.createButton(3, 'Dim Down', events)
              this.createButton(4, 'Off', SINGLE_LONG) // Hue
              if (repeat) this.repeat = [2, 3]
              break
            case 'ZGPSWITCH': // Hue tap
              namespace = Characteristic.ServiceLabelNamespace.DOTS
              this.createButton(1, '1', SINGLE)
              this.createButton(2, '2', SINGLE)
              this.createButton(3, '3', SINGLE)
              this.createButton(4, '4', SINGLE)
              this.createButton(5, '1 and 2', SINGLE)
              this.createButton(6, '3 and 4', SINGLE)
              this.convertButtonEvent = (value) => {
                return {
                  34: 1002, // Press 1
                  1000: 1002,
                  16: 2002, // Press 2
                  2000: 2002,
                  17: 3002, // Press 3
                  3000: 3002,
                  18: 4002, // Press 4
                  4000: 4002,
                  100: 5000, // Press 1 and 2
                  101: 5002, // Release 1 and 2
                  98: 6000, // Press 3 and 4
                  99: 6002 // Release 3 and 4
                }[value]
              }
              break
            default:
              break
          }
          break
        }
        case 'PhilipsFoH':
          switch (this.obj.modelid) {
            case 'FOHSWITCH': { // Friends-of-Hue switch
              const events = this.bridge.isDeconz ? SINGLE_LONG : SINGLE
              this.createButton(1, 'Top Left', events)
              this.createButton(2, 'Bottom Left', events)
              this.createButton(3, 'Top Right', events)
              this.createButton(4, 'Bottom Right', events)
              this.createButton(5, 'Top Both', events)
              this.createButton(6, 'Bottom Both', events)
              this.convertButtonEvent = (value) => {
                if (value < 1000) {
                  return {
                    16: 1000, // Press Top Left
                    20: 1002, // Release Top Left
                    17: 2000, // Press Bottom Left
                    21: 2002, // Release Bottom Left
                    19: 3000, // Press Top Right
                    23: 3002, // Relesase Top Right
                    18: 4000, // Press Botton Right
                    22: 4002, // Release Bottom Right
                    100: 5000, // Press Top Both
                    101: 5002, // Release Top Both
                    98: 6000, // Press Bottom Both
                    99: 6002 // Release Bottom Both
                  }[value]
                }
                return value
              }
              break
            }
            default:
              break
          }
          break
        case 'Samjin':
          switch (this.obj.modelid) {
            case 'button':
              this.createButton(1, 'Button', SINGLE_DOUBLE_LONG)
              break
            default:
              break
          }
          break
        case 'Sunricher':
          switch (this.obj.modelid) {
            case 'ZG2833K8_EU05': // Sunricher 8-button remote, see #529.
              if (this.endpoint === '01') {
                this.createButton(1, 'On 1', SINGLE_LONG)
                this.createButton(2, 'Off 1', SINGLE_LONG)
              } else if (this.endpoint === '02') {
                this.createButton(3, 'On 2', SINGLE_LONG)
                this.createButton(4, 'Off 2', SINGLE_LONG)
              } else if (this.endpoint === '03') {
                this.createButton(5, 'On 3', SINGLE_LONG)
                this.createButton(6, 'Off 3', SINGLE_LONG)
              } else if (this.endpoint === '04') {
                this.createButton(7, 'On 4', SINGLE_LONG)
                this.createButton(8, 'Off 4', SINGLE_LONG)
              }
              break
            case 'ZG2833PAC': // Sunricher C4
              this.createButton(1, 'Rocker 1', SINGLE)
              this.createButton(2, 'Rocker 2', SINGLE)
              this.createButton(3, 'Rocker 3', SINGLE)
              this.createButton(4, 'Rocker 4', SINGLE)
              break
            case 'ZGRC-KEY-002': // Sunricher CCT remote, see #529.
              this.createButton(1, 'On', SINGLE)
              this.createButton(2, 'Off', SINGLE)
              this.createButton(3, 'Dim', LONG)
              this.createButton(4, 'C/W', SINGLE_LONG)
              break
            default:
              break
          }
          break
        case '_TZ3000_arfwfgoa':
          switch (this.obj.modelid) {
            case 'TS0042': // Tuys 2-button switch, single endpoint
              this.createButton(1, 'Left', SINGLE_DOUBLE_LONG)
              this.createButton(2, 'Right', SINGLE_DOUBLE_LONG)
              break
            default:
              break
          }
          break
        case '_TZ3000_dfgbtub0':
        case '_TZ3000_i3rjdrwu':
          switch (this.obj.modelid) {
            case 'TS0042': // Tuya 2-button switch, see #1060.
              if (this.endpoint === '01') {
                this.createButton(1, 'Button 1', SINGLE_DOUBLE_LONG)
              } else if (this.endpoint === '02') {
                this.createButton(2, 'Button 2', SINGLE_DOUBLE_LONG)
              }
              break
            default:
              break
          }
          break
        case '_TZ3000_pzui3skt':
          switch (this.obj.modelid) {
            case 'TS0041': // Tuya 1-button switch
              this.createButton(1, 'Button', SINGLE_DOUBLE_LONG)
              break
            default:
              break
          }
          break
        case '_TZ3000_rrjr1q0u':
          switch (this.obj.modelid) {
            case 'TS0043': // Tuya 3-button switch
              this.createButton(1, 'Left', SINGLE_DOUBLE_LONG)
              this.createButton(2, 'Middle', SINGLE_DOUBLE_LONG)
              this.createButton(3, 'Right', SINGLE_DOUBLE_LONG)
              break
            default:
              break
          }
          break
        case '_TZ3000_vp6clf9d':
          switch (this.obj.modelid) {
            case 'TS0044':
              this.createButton(1, 'Bottom Left', SINGLE_DOUBLE_LONG)
              this.createButton(2, 'Bottom Right', SINGLE_DOUBLE_LONG)
              this.createButton(3, 'Top Right', SINGLE_DOUBLE_LONG)
              this.createButton(4, 'Top Left', SINGLE_DOUBLE_LONG)
              break
            default:
              break
          }
          break
        case '_TZ3000_wkai4ga5':
          switch (this.obj.modelid) {
            case 'TS0044':
              namespace = Characteristic.ServiceLabelNamespace.DOTS
              this.createButton(1, 'Top Left', SINGLE_DOUBLE_LONG)
              this.createButton(2, 'Top Right', SINGLE_DOUBLE_LONG)
              this.createButton(3, 'Bottom Left', SINGLE_DOUBLE_LONG)
              this.createButton(4, 'Bottom Right', SINGLE_DOUBLE_LONG)
              break
            default:
              break
          }
          break
        case '_TZ3000_xabckq1v':
          switch (this.obj.modelid) {
            case 'TS004F': // Tuya 4-button switch, single press only
              this.createButton(1, 'Top Left', SINGLE)
              this.createButton(2, 'Bottom Left', SINGLE)
              this.createButton(3, 'Top Right', SINGLE)
              this.createButton(4, 'Bottom Right', SINGLE)
              break
            default:
              break
          }
          break
        case 'dresden elektronik':
          switch (this.obj.modelid) {
            case 'Kobold':
              this.createButton(1, 'Button', SINGLE_LONG)
              break
            case 'Lighting Switch':
              if (this.endpoint === '01') {
                if (this.obj.mode !== 2) {
                  this.log.warn(
                    '%s: %s: warning: Lighting Switch mode %d instead of 2',
                    this.bridge.name, this.resource, this.obj.mode
                  )
                }
                this.createButton(1, 'Top Left', SINGLE_LONG)
                this.createButton(2, 'Bottom Left', SINGLE_LONG)
                this.createButton(3, 'Top Right', SINGLE_LONG)
                this.createButton(4, 'Bottom Right', SINGLE_LONG)
              }
              break
            case 'Scene Switch':
              this.createButton(1, 'On', SINGLE_LONG)
              this.createButton(2, 'Off', SINGLE_LONG)
              this.createButton(3, 'Scene 1', SINGLE)
              this.createButton(4, 'Scene 2', SINGLE)
              this.createButton(5, 'Scene 3', SINGLE)
              this.createButton(6, 'Scene 4', SINGLE)
              break
            default:
              break
          }
          break
        case 'eWeLink':
          switch (this.obj.modelid) {
            case 'WB01':
              this.createButton(1, 'Press', SINGLE_DOUBLE_LONG)
              break
            default:
              break
          }
          break
        case 'icasa':
          switch (this.obj.modelid) {
            case 'ICZB-KPD12':
            case 'ICZB-KPD14S':
            case 'ICZB-KPD18S':
              this.createButton(1, 'Off', SINGLE_LONG)
              this.createButton(2, 'On', SINGLE_LONG)
              if (this.obj.modelid !== 'ICZB-KPD12') {
                this.createButton(3, 'S1', SINGLE)
                this.createButton(4, 'S2', SINGLE)
                if (this.obj.modelid === 'ICZB-KPD18S') {
                  this.createButton(5, 'S3', SINGLE)
                  this.createButton(6, 'S4', SINGLE)
                  this.createButton(7, 'S5', SINGLE)
                  this.createButton(8, 'S6', SINGLE)
                }
              }
              break
            case 'ICZB-RM11S':
              this.createButton(1, '1 Off', SINGLE_LONG)
              this.createButton(2, '1 On', SINGLE_LONG)
              this.createButton(3, '2 Off', SINGLE_LONG)
              this.createButton(4, '2 On', SINGLE_LONG)
              this.createButton(5, '3 Off', SINGLE_LONG)
              this.createButton(6, '3 On', SINGLE_LONG)
              this.createButton(7, '4 Off', SINGLE_LONG)
              this.createButton(8, '4 On', SINGLE_LONG)
              this.createButton(9, 'S1', SINGLE)
              this.createButton(10, 'S2', SINGLE)
              break
            default:
              break
          }
          break
        case 'innr':
          switch (this.obj.modelid) {
            case 'RC 110':
              if (this.endpoint === '01') {
                this.createButton(1, 'On/Off', SINGLE)
                this.createButton(2, 'Dim Up', SINGLE_LONG)
                this.createButton(3, 'Dim Down', SINGLE_LONG)
                this.createButton(4, '1', SINGLE)
                this.createButton(5, '2', SINGLE)
                this.createButton(6, '3', SINGLE)
                this.createButton(7, '4', SINGLE)
                this.createButton(8, '5', SINGLE)
                this.createButton(9, '6', SINGLE)
                for (let i = 1; i <= 6; i++) {
                  const button = 7 + i * 3
                  this.createButton(button, `On/Off ${i}`, SINGLE)
                  this.createButton(button + 1, `Dim Up ${i}`, SINGLE_LONG)
                  this.createButton(button + 2, `Dim Down ${i}`, SINGLE_LONG)
                }
              }
              break
            default:
              break
          }
          break
        case 'lk':
          switch (this.obj.modelid) {
            case 'ZBT-DIMSwitch-D0001': // Linkind 1-Key Remote Control, see #949.
              this.createButton(1, 'Button', SINGLE_LONG)
              homekitValue = (v) => { return 1 }
              break
            default:
              break
          }
          break
        case 'ubisys':
          switch (this.obj.modelid) {
            case 'C4 (5504)':
            case 'C4-R (5604)':
              this.createButton(1, '1', SINGLE_LONG)
              this.createButton(2, '2', SINGLE_LONG)
              this.createButton(3, '3', SINGLE_LONG)
              this.createButton(4, '4', SINGLE_LONG)
              break
            case 'D1 (5503)':
            case 'D1-R (5603)':
            case 'S1-R (5601)':
            case 'S2 (5502)':
            case 'S2-R (5602)':
              this.createButton(1, '1', SINGLE_LONG)
              this.createButton(2, '2', SINGLE_LONG)
              break
            case 'S1 (5501)':
              this.createButton(1, '1', SINGLE_LONG)
              break
            default:
              break
          }
          break
        default:
          break
      }
      if (Object.keys(this.buttonMap).length > 0) {
        this.createLabel(namespace)
        this.type = {
          key: 'buttonevent',
          homekitValue,
          homekitAction
        }
      } else {
        this.log.warn(
          '%s: %s: warning: ignoring unknown %s sensor %j',
          this.bridge.name, this.resource, this.obj.type, this.obj
        )
      }
      break
    }
    case 'ZHARelativeRotary':
    case 'ZLLRelativeRotary': {
      this.buttonMap = {}
      let namespace = Characteristic.ServiceLabelNamespace.ARABIC_NUMERALS
      let homekitValue
      if (
        this.obj.manufacturername === 'Signify Netherlands B.V.' &&
        this.obj.modelid === 'RDM002'
      ) {
        // Hue tap dial switch
        namespace = Characteristic.ServiceLabelNamespace.DOTS
        this.createButton(5, 'Turn Right', SINGLE)
        this.createButton(6, 'Turn Left', SINGLE)
        homekitValue = (v) => { return v > 0 ? 5 : 6 }
      } else if (
        this.obj.manufacturername === 'Lutron' &&
        this.obj.modelid === 'Z3-1BRL'
      ) {
        // Lutron Aurora, see #522.
        this.createButton(2, 'Turn Right', SINGLE)
        this.createButton(3, 'Turn Left', SINGLE)
        homekitValue = (v) => { return v > 0 ? 2 : 3 }
      }
      if (Object.keys(this.buttonMap).length > 0) {
        this.createLabel(namespace)
        this.type = {
          key: 'expectedrotation',
          homekitValue,
          homekitAction: () => {
            return Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS
          }
        }
      } else {
        this.log.warn(
          '%s: %s: warning: ignoring unknown %s sensor %j',
          this.bridge.name, this.resource, this.obj.type, this.obj
        )
      }
      break
    }
    case 'CLIPSwitch': // 2.1
      // We'd need a way to specify the number of buttons, cf. max value for
      // a CLIPGenericStatus sensor.
      this.log.warn(
        '%s: %s: warning: ignoring unsupported sensor type %s',
        this.bridge.name, this.resource, this.obj.type
      )
      break
    case 'ZLLPresence':
      // falls through
    case 'ZHAPresence':
      if (
        ['Philips', 'Signify Netherlands B.V.'].includes(this.obj.manufacturername) &&
        ['SML001', 'SML002', 'SML003', 'SML004'].includes(this.obj.modelid)
      ) {
        // 1.3 - Hue motion sensor
        durationKey = 'delay'
      } else if (
        this.obj.manufacturername === 'IKEA of Sweden' &&
        this.obj.modelid === 'TRADFRI motion sensor'
      ) {
        // Ikea Trådfri motion sensor
        this.obj.state.dark = false
      } else if (
        this.obj.manufacturername === 'LUMI' && (
          this.obj.modelid === 'lumi.sensor_motion' ||
          this.obj.modelid === 'lumi.sensor_motion.aq2'
        )
      ) {
        // Xiaomi motion sensor
        // Xiaomi Aqara motion sensor
      } else if (
        this.obj.manufacturername === 'aqara' &&
        this.obj.modelid === 'lumi.motion.ac01'
      ) {
        // Aqara Presence Detector FP1
        presenceevent = true
        // this.obj.config.sensitivitymax = 2
      } else if (
        this.obj.manufacturername === 'Heiman' &&
        this.obj.modelid === 'PIR_TPV11'
      ) {
        // Heiman motion sensor
      } else if (
        this.obj.manufacturername === 'SmartThings' &&
        this.obj.modelid === 'tagv4'
      ) {
        // Samsung SmartThings arrival sensor
      } else if (
        this.obj.manufacturername === 'Konke' &&
        this.obj.modelid === '3AFE28010402000D'
      ) {
        // Konke motion sensor
      } else if (
        this.obj.manufacturername === 'SILVERCREST' &&
        this.obj.modelid === 'TY0202'
      ) {
        // LIDL motion sensor, see #979.
      } else {
        this.log.warn(
          '%s: %s: warning: unknown %s sensor %j',
          this.bridge.name, this.resource, this.obj.type, this.obj
        )
      }
      // falls through
    case 'CLIPPresence': // 2.3
    case 'Geofence': // Undocumented
      this.service = new eve.Services.MotionSensor(this.name, this.subtype)
      this.serviceList.push(this.service)
      this.duration = 0
      this.type = {
        Characteristic: Characteristic.MotionDetected,
        key: presenceevent ? 'presenceevent' : 'presence',
        name: 'motion',
        unit: '',
        history: 'motion',
        homekitValue: presenceevent
          ? (v) => { return v.endsWith('leave') ? 0 : 1 }
          : (v) => { return v ? 1 : 0 },
        durationKey,
        sensitivitymax: this.obj.config.sensitivitymax
      }
      break
    case 'ZLLTemperature':
    case 'ZHATemperature':
      if (
        ['Philips', 'Signify Netherlands B.V.'].includes(this.obj.manufacturername) &&
        ['SML001', 'SML002', 'SML003', 'SML004'].includes(this.obj.modelid)
      ) {
        // 1.4 - Hue motion sensor
      } else if (
        this.obj.manufacturername === 'LUMI' && (
          this.obj.modelid === 'lumi.weather' ||
          this.obj.modelid === 'lumi.sensor_ht'
        )
      ) {
        // Xiaomi temperature/humidity sensor
        // Xiaomi Aqara weather sensor
      } else if (
        this.obj.manufacturername === 'Heiman' &&
        (this.obj.modelid === 'TH-H_V15' || this.obj.modelid === 'TH-T_V15')
      ) {
        // Heiman temperature/humidity sensor
      } else if (
        this.obj.manufacturername === 'Samjin' &&
        this.obj.modelid === 'button'
      ) {
        // Samsung SmartThings Button temperature sensor
      } else if (
        this.obj.manufacturername === 'Samjin' &&
        this.obj.modelid === 'multi'
      ) {
        // Samsung SmartThings multipurpose sensor
      } else if (
        this.obj.manufacturername === 'Develco Products AS' && (
          this.obj.modelid === 'SMSZB-120' ||
          this.obj.modelid === 'HESZB-120'
        )
      ) {
        // Develco smoke sensor
        // Develco heat sensor
      } else if (this.obj.modelid === 'lumi.airmonitor.acn01') {
        // Xiaomi Aquara TVOC Sensor
        temperatureHistory = 'room2'
      } else {
        this.log.warn(
          '%s: %s: warning: unknown %s sensor %j',
          this.bridge.name, this.resource, this.obj.type, this.obj
        )
      }
      // falls through
    case 'CLIPTemperature': // 2.4
      this.service = new eve.Services.TemperatureSensor(this.name, this.subtype)
      this.serviceList.push(this.service)
      this.type = {
        Characteristic: Characteristic.CurrentTemperature,
        key: 'temperature',
        name: 'temperature',
        unit: '°C',
        history: temperatureHistory,
        homekitValue: (v) => { return v ? Math.round(v / 10) / 10 : 0 }
      }
      break
    case 'ZHAAirQuality':
      if (
        this.obj.manufacturername === 'LUMI' &&
        this.obj.modelid === 'lumi.airmonitor.acn01'
      ) {
        // Xiaomi Aqara airquality sensor
      } else {
        this.log.warn(
          '%s: %s: warning: unknown %s sensor %j',
          this.bridge.name, this.resource, this.obj.type, this.obj
        )
      }
      // falls through
    case 'CLIPAirQuality':
      this.service = new Service.AirQualitySensor(this.name, this.subtype)
      this.serviceList.push(this.service)
      this.service
        .addOptionalCharacteristic(Characteristic.AirQuality)
      this.type = {
        Characteristic: Characteristic.VOCDensity,
        key: 'airqualityppb',
        name: 'VOC density',
        unit: ' µg/m³',
        props: { minValue: 0, maxValue: 65535, minStep: 1 },
        history: 'room2',
        homekitValue: (v) => {
          return v ? Math.round(v * 4.57) : 0
        }
      }
      break
    case 'ZLLLightLevel': // 2.7 - Hue Motion Sensor
    case 'ZHALightLevel':
      if (
        ['Philips', 'Signify Netherlands B.V.'].includes(this.obj.manufacturername) &&
        ['SML001', 'SML002', 'SML003', 'SML004'].includes(this.obj.modelid)
      ) {
        // 1.4 - Hue motion sensor
      } else if (
        this.obj.manufacturername === 'LUMI' &&
        this.obj.modelid === 'lumi.sensor_motion.aq2'
      ) {
        // Xiaomi Aqara motion sensor
      } else if (
        this.obj.manufacturername === 'LUMI' &&
        this.obj.modelid === 'lumi.sen_ill.mgl01'
      ) {
        // Xiaomi Mi light intensity sensor
      } else {
        this.log.warn(
          '%s: %s: warning: unknown %s sensor %j',
          this.bridge.name, this.resource, this.obj.type, this.obj
        )
      }
      // falls through
    case 'CLIPLightLevel': // 2.7
      this.service = new Service.LightSensor(this.name, this.subtype)
      this.serviceList.push(this.service)
      this.type = {
        Characteristic: Characteristic.CurrentAmbientLightLevel,
        key: 'lightlevel',
        name: 'light level',
        unit: ' lux',
        homekitValue: hkLightLevel
      }
      break
    case 'ZHAOpenClose':
      if (
        this.obj.manufacturername === 'LUMI' && (
          this.obj.modelid === 'lumi.sensor_magnet.aq2' ||
          this.obj.modelid === 'lumi.sensor_magnet'
        )
      ) {
        // Xiaomi Aqara door/window sensor
        // Xiaomi Mi door/window sensor
      } else if (
        this.obj.manufacturername === 'Heiman' &&
        this.obj.modelid === 'DOOR_TPV13'
      ) {
        // Heiman smart door sensor
      } else if (
        this.obj.manufacturername === 'Samjin' &&
        this.obj.modelid === 'multi'
      ) {
        // Samsung SmartThings multipurpose sensor
      } else {
        this.log.warn(
          '%s: %s: warning: unknown %s sensor %j',
          this.bridge.name, this.resource, this.obj.type, this.obj
        )
      }
      // falls through
    case 'CLIPOpenClose': // 2.2
      this.service = new eve.Services.ContactSensor(this.name, this.subtype)
      this.serviceList.push(this.service)
      this.type = {
        Characteristic: Characteristic.ContactSensorState,
        key: 'open',
        name: 'contact',
        unit: '',
        history: 'door',
        homekitValue: (v) => { return v ? 1 : 0 }
      }
      break
    case 'ZHAHumidity':
      if (
        this.obj.manufacturername === 'LUMI' && (
          this.obj.modelid === 'lumi.weather' ||
          this.obj.modelid === 'lumi.sensor_ht'
        )
      ) {
        // Xiaomi Aqara weather sensor
        // Xiaomi Mi temperature/humidity sensor
      } else if (this.obj.modelid === 'lumi.airmonitor.acn01') {
        // Xiaomi Aquara TVOC Sensor
        temperatureHistory = 'room2'
      } else if (
        this.obj.manufacturername === 'Heiman' &&
        (this.obj.modelid === 'TH-H_V15' || this.obj.modelid === 'TH-T_V15')
      ) {
        // Heiman temperature/humidity sensor
      } else {
        this.log.warn(
          '%s: %s: warning: unknown %s sensor %j',
          this.bridge.name, this.resource, this.obj.type, this.obj
        )
      }
      // falls through
    case 'CLIPHumidity': // 2.5
      this.service = new Service.HumiditySensor(this.name, this.subtype)
      this.serviceList.push(this.service)
      this.type = {
        Characteristic: Characteristic.CurrentRelativeHumidity,
        key: 'humidity',
        name: 'humidity',
        unit: '%',
        history: temperatureHistory,
        homekitValue: (v) => { return v ? Math.round(v / 100) : 0 }
      }
      break
    case 'ZHAPressure':
      if (
        this.obj.manufacturername === 'LUMI' &&
        this.obj.modelid === 'lumi.weather'
      ) {
        // Xiaomi Aqara weather sensor
      } else {
        this.log.warn(
          '%s: %s: warning: unknown %s sensor %j',
          this.bridge.name, this.resource, this.obj.type, this.obj
        )
      }
      // falls through
    case 'CLIPPressure':
      this.service = new eve.Services.AirPressureSensor(this.name, this.subtype)
      this.serviceList.push(this.service)
      this.type = {
        Characteristic: eve.Characteristics.AirPressure,
        key: 'pressure',
        name: 'pressure',
        unit: ' hPa',
        history: 'weather',
        homekitValue: (v) => { return v ? Math.round(v) : 0 }
      }
      this.service.updateCharacteristic(eve.Characteristics.Elevation, 0)
      break
    case 'ZHAAlarm':
      if (
        this.obj.manufacturername.toLowerCase() === 'heiman' &&
        this.obj.modelid.startsWith('WarningDevice')
      ) {
        // Heiman Siren
      } else {
        this.log.warn(
          '%s: %s: warning: unknown %s sensor %j',
          this.bridge.name, this.resource, this.obj.type, this.obj
        )
      }
      // falls through
    case 'CLIPAlarm':
      this.service = new my.Services.Resource(this.name, this.subtype)
      this.service.addOptionalCharacteristic(my.Characteristics.Alarm)
      this.serviceList.push(this.service)
      this.type = {
        Characteristic: my.Characteristics.Alarm,
        key: 'alarm',
        name: 'alarm',
        homekitValue: (v) => { return v ? 1 : 0 }
      }
      break
    case 'ZHACarbonMonoxide':
      if (
        this.obj.manufacturername === 'Heiman' &&
        this.obj.modelid === 'CO_V16'
      ) {
        // Heiman CO sensor
      } else {
        this.log.warn(
          '%s: %s: warning: unknown %s sensor %j',
          this.bridge.name, this.resource, this.obj.type, this.obj
        )
      }
      // falls through
    case 'CLIPCarbonMonoxide':
      this.service = new Service.CarbonMonoxideSensor(this.name, this.subtype)
      this.serviceList.push(this.service)
      this.type = {
        Characteristic: Characteristic.CarbonMonoxideDetected,
        key: 'carbonmonoxide',
        name: 'CO',
        unit: '',
        homekitValue: (v) => { return v ? 1 : 0 }
      }
      break
    case 'ZHAFire':
      if (
        this.obj.manufacturername.toLowerCase() === 'heiman' && (
          this.obj.modelid === 'SMOK_V16' ||
          this.obj.modelid === 'SMOK_YDLV10' ||
          this.obj.modelid === 'GAS_V15' ||
          this.obj.modelid === 'SmokeSensor-N-3.0' ||
          this.obj.modelid === 'SmokeSensor-EF-3.0' ||
          this.obj.modelid === 'GASSensor-EM'
        )
      ) {
        // Heiman fire sensor
        // Heiman gas sensor
      } else if (
        this.obj.manufacturername === 'Develco Products AS' && (
          this.obj.modelid === 'SMSZB-120' ||
          this.obj.modelid === 'HESZB-120'
        )
      ) {
        // Develco smoke sensor
        // Develco heat sensor
      } else {
        this.log.warn(
          '%s: %s: warning: unknown %s sensor %j',
          this.bridge.name, this.resource, this.obj.type, this.obj
        )
      }
      // falls through
    case 'CLIPFire':
      this.service = new Service.SmokeSensor(this.name, this.subtype)
      this.serviceList.push(this.service)
      this.type = {
        Characteristic: Characteristic.SmokeDetected,
        key: 'fire',
        name: 'smoke',
        unit: '',
        homekitValue: (v) => { return v ? 1 : 0 }
      }
      break
    case 'ZHAVibration':
      if (
        this.obj.manufacturername === 'LUMI' &&
        this.obj.modelid === 'lumi.vibration.aq1'
      ) {
        // Xiaomi vibration sensor
      } else if (
        this.obj.manufacturername === 'Samjin' &&
        this.obj.modelid === 'multi'
      ) {
        // Samsung SmartThings multipurpose sensor
      } else {
        this.log.warn(
          '%s: %s: warning: unknown %s sensor %j',
          this.bridge.name, this.resource, this.obj.type, this.obj
        )
      }
      // falls through
    case 'CLIPVibration':
      this.service = new eve.Services.MotionSensor(this.name, this.subtype)
      this.serviceList.push(this.service)
      this.duration = 0
      this.type = {
        Characteristic: Characteristic.MotionDetected,
        key: 'vibration',
        name: 'motion',
        unit: '',
        history: 'motion',
        durationKey,
        homekitValue: (v) => { return v ? 1 : 0 },
        sensitivitymax: this.obj.config.sensitivitymax
      }
      break
    case 'ZHAWater':
      if (
        (
          this.obj.manufacturername === 'LUMI' &&
          this.obj.modelid === 'lumi.sensor_wleak.aq1'
        ) || (
          this.obj.manufacturername === 'Heiman' &&
          this.obj.modelid === 'WATER_TPV11'
        )
      ) {
        // Xiaomi Aqara flood sensor
        // Heiman water sensor
      } else {
        this.log.warn(
          '%s: %s: warning: unknown %s sensor %j',
          this.bridge.name, this.resource, this.obj.type, this.obj
        )
      }
      // falls through
    case 'CLIPWater':
      this.service = new Service.LeakSensor(this.name, this.subtype)
      this.serviceList.push(this.service)
      this.type = {
        Characteristic: Characteristic.LeakDetected,
        key: 'water',
        name: 'leak',
        unit: '',
        homekitValue: (v) => { return v ? 1 : 0 }
      }
      break
    case 'ZHAConsumption':
      // falls through
    case 'CLIPConsumption':
      if (this.accessory.lightService == null) {
        this.service = new my.Services.Resource(this.name, this.subtype)
      } else {
        this.service = this.accessory.lightService
        // this.noSetNameCallback = true
      }
      this.serviceList.push(this.service)
      this.service
        .addOptionalCharacteristic(eve.Characteristics.TotalConsumption)
      this.type = {
        Characteristic: eve.Characteristics.TotalConsumption,
        key: 'consumption',
        name: 'total consumption',
        unit: ' kWh',
        history: 'energy',
        homekitValue: (v) => { return v / 1000.0 }
      }
      break
    case 'ZHAPower':
      // falls through
    case 'CLIPPower':
      if (this.accessory.lightService == null) {
        this.service = new my.Services.Resource(this.name, this.subtype)
      } else {
        this.service = this.accessory.lightService
        // this.noSetNameCallback = true
      }
      this.serviceList.push(this.service)
      this.service
        .addOptionalCharacteristic(eve.Characteristics.Consumption)
      this.type = {
        Characteristic: eve.Characteristics.Consumption,
        key: 'power',
        name: 'current consumption',
        unit: ' W',
        history: 'energy',
        homekitValue: (v) => { return v }
      }
      break
    case 'ZHAThermostat':
      if (
        this.obj.manufacturername === 'ELKO' &&
        this.obj.modelid === 'Super TR'
      ) {
        heatValue = 'heat'
      }
      // falls through
    case 'CLIPThermostat':
      if (this.obj.config.mode == null) {
        this.log.warn(
          '%s: %s: warning: incompatible %s sensor %j',
          this.bridge.name, this.resource, this.obj.type, this.obj
        )
      }
      this.service = new Service.Thermostat(this.name, this.subtype)
      this.serviceList.push(this.service)
      this.type = {
        Characteristic: Characteristic.CurrentTemperature,
        key: 'temperature',
        name: 'temperature',
        unit: '°C',
        history: 'thermo',
        heatValue,
        homekitValue: (v) => { return v ? Math.round(v / 10) / 10 : 0 }
      }
      break
    case 'ZHATime':
      this.log.warn(
        '%s: %s: warning: ignoring unsupported sensor type %s',
        this.bridge.name, this.resource, this.obj.type
      )
      break
    case 'Daylight':
      if (
        this.obj.manufacturername === this.bridge.philips &&
        this.obj.modelid === 'PHDL00'
      ) {
        // 2.6 - Built-in daylight sensor.
        if (!this.obj.config.configured) {
          this.log.warn(
            '%s: %s: warning: %s sensor not configured',
            this.bridge.name, this.resource, this.obj.type
          )
        }
        this.manufacturer = this.obj.manufacturername
        this.model = this.obj.modelid
        this.service = new Service.LightSensor(this.name, this.subtype)
        this.serviceList.push(this.service)
        this.type = {
          Characteristic: Characteristic.CurrentAmbientLightLevel,
          key: 'lightlevel',
          name: 'light level',
          unit: ' lux',
          homekitValue: hkLightLevel
        }
        if (obj.state.status == null) {
          // Hue bridge
          obj.state.lightlevel = obj.state.daylight ? 65535 : 0
          obj.state.dark = !obj.state.daylight
        }
        obj.config.reachable = obj.config.configured
      } else {
        this.log.warn(
          '%s: %s: warning: ignoring unknown %s sensor %j',
          this.bridge.name, this.resource, this.obj.type, this.obj
        )
      }
      break
    case 'ZHABattery':
    case 'CLIPBattery':
      this.service = this.accessory.getBatteryService(
        this.obj.state.battery
      )
      // this.serviceList.push(this.service)
      this.type = {
        Characteristic: Characteristic.BatteryLevel,
        key: 'battery',
        name: 'battery',
        unit: '%',
        homekitValue: (v) => { return toInt(v, 0, 100) }
      }
      break
    case 'CLIPGenericFlag': // 2.8
      this.service = new Service.Switch(this.name, this.subtype)
      this.serviceList.push(this.service)
      this.type = {
        Characteristic: Characteristic.On,
        key: 'flag',
        name: 'on',
        unit: '',
        homekitValue: (v) => { return v },
        bridgeValue: (v) => { return v },
        setter: true
      }
      // Note that Eve handles a read-only switch correctly, but Home doesn't.
      if (
        this.obj.manufacturername === 'homebridge-hue' &&
        this.obj.modelid === 'CLIPGenericFlag' &&
        this.obj.swversion === '0'
      ) {
        this.type.props = {
          perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
        }
      }
      break
    case 'CLIPGenericStatus': // 2.9
      if (
        this.obj.manufacturername === 'Philips' &&
        this.obj.modelid === 'HUELABSVTOGGLE' && this.obj.swversion === '2.0'
      ) {
        // Hue labs toggle, see #1028.
        this.service = new Service.Switch(this.name, this.subtype)
        this.serviceList.push(this.service)
        this.type = {
          Characteristic: Characteristic.On,
          key: 'status',
          name: 'on',
          unit: '',
          homekitValue: (v) => { return v !== 0 },
          bridgeValue: (v) => { return v ? 1 : 0 },
          setter: true
        }
        break
      }
      this.service = new my.Services.Status(this.name, this.subtype)
      this.serviceList.push(this.service)
      this.type = {
        Characteristic: my.Characteristics.Status,
        key: 'status',
        name: 'status',
        unit: '',
        homekitValue: (v) => {
          return v > 127 ? 127 : v < -127 ? -127 : v
        },
        bridgeValue: (v) => { return v },
        setter: true
      }
      if (
        this.obj.manufacturername === 'homebridge-hue' &&
        this.obj.modelid === 'CLIPGenericStatus'
      ) {
        const min = parseInt(obj.swversion.split(',')[0])
        const max = parseInt(obj.swversion.split(',')[1])
        const step = parseInt(obj.swversion.split(',')[2])
        // Eve 3.1 displays the following controls, depending on the properties:
        // 1. {minValue: 0, maxValue: 1, minStep: 1}                    switch
        // 2. {minValue: a, maxValue: b, minStep: 1}, 1 < b - a <= 20   down|up
        // 3. {minValue: a, maxValue: b}, (a, b) != (0, 1)              slider
        // 4. {minValue: a, maxValue: b, minStep: 1}, b - a > 20        slider
        // Avoid the following bugs:
        // 5. {minValue: 0, maxValue: 1}                                nothing
        // 6. {minValue: a, maxValue: b, minStep: 1}, b - a = 1         switch*
        //    *) switch sends values 0 and 1 instead of a and b;
        if (min === 0 && max === 0) {
          this.type.props = {
            perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
          }
        } else if (min >= -127 && max <= 127 && min < max) {
          if (min === 0 && max === 1) {
            // Workaround Eve bug (case 5 above).
            this.type.props = { minValue: min, maxValue: max, minStep: 1 }
          } else if (max - min === 1) {
            // Workaround Eve bug (case 6 above).
            this.type.props = { minValue: min, maxValue: max }
          } else if (step !== 1) {
            // Default to slider for backwards compatibility.
            this.type.props = { minValue: min, maxValue: max }
          } else {
            this.type.props = { minValue: min, maxValue: max, minStep: 1 }
          }
        }
        this.log.debug(
          '%s: %s: props: %j', this.bridge.name,
          this.resource, this.type.props
        )
      }
      break
    default:
      this.log.warn(
        '%s: %s: warning: ignoring unknown sensor type %j',
        this.bridge.name, this.resource, this.obj
      )
      break
  }

  if (this.service) {
    if (this.type.Characteristic) {
      const char = this.service.getCharacteristic(this.type.Characteristic)
      if (this.type.props) {
        char.setProps(this.type.props)
      }
      if (this.type.setter) {
        char.on('set', this.setValue.bind(this))
      }
      if (this.type.history != null) {
        this.historyService = this.accessory
          .getHistoryService(this.type.history, this)
        this.history = this.accessory.history
        if (this.type.history !== this.history.type) {
          // History service already used for other type.
          this.historyService = null
          this.history = null
          this.type.history = null
        }
        const now = Math.round(new Date().valueOf() / 1000)
        const epoch = Math.round(
          new Date('2001-01-01T00:00:00Z').valueOf() / 1000
        )
        switch (this.type.history) {
          case 'door':
            this.hk.timesOpened = 0
            this.historyService
              .addOptionalCharacteristic(eve.Characteristics.ResetTotal)
            this.historyService.getCharacteristic(eve.Characteristics.ResetTotal)
              .setValue(now - epoch)
              .on('set', (value, callback) => {
                this.hk.timesOpened = 0
                this.service.updateCharacteristic(
                  eve.Characteristics.TimesOpened, this.hk.timesOpened
                )
                callback(null)
              })
            // falls through
          case 'motion':
            this.history.entry.status = 0
            break
          case 'energy':
            this.service
              .addOptionalCharacteristic(eve.Characteristics.TotalConsumption)
            this.service
              .addOptionalCharacteristic(eve.Characteristics.Consumption)
            if (this.history.resource.type.key === 'power') {
              this.history.consumption = 0
              this.history.totalConsumption = 0
              this.historyService
                .addOptionalCharacteristic(eve.Characteristics.ResetTotal)
              this.historyService
                .getCharacteristic(eve.Characteristics.ResetTotal)
                .setValue(now - epoch)
                .on('set', (value, callback) => {
                  this.history.totalConsumption = 0
                  this.service.updateCharacteristic(
                    eve.Characteristics.TotalConsumption,
                    this.history.totalConsumption
                  )
                  callback(null)
                })
            }
            this.history.entry.power = 0
            break
          case 'thermo':
            this.history.entry.currentTemp = 0
            this.history.entry.setTemp = 0
            this.history.entry.valvePosition = 0
            break
          case 'weather':
            this.history.entry.temp = 0
            this.history.entry.humidity = 0
            this.history.entry.pressure = 0
            break
          case 'room2':
            this.history.entry.temp = 0
            this.history.entry.humidity = 0
            this.history.entry.voc = 0
            break
          default:
            break
        }
      }
      this.checkValue(this.obj.state[this.type.key])
    }
    // if (this.obj.lastseen !== undefined) {
    //   this.service.addOptionalCharacteristic(my.Characteristics.LastSeen)
    //   this.checkLastSeen(this.obj.lastseen)
    // }
    this.service.addOptionalCharacteristic(my.Characteristics.LastUpdated)
    this.checkLastupdated(this.obj.state.lastupdated)
    if (this.obj.state.dark !== undefined) {
      this.service.addOptionalCharacteristic(my.Characteristics.Dark)
      this.checkDark(this.obj.state.dark)
    }
    if (this.obj.state.daylight !== undefined) {
      this.service.addOptionalCharacteristic(my.Characteristics.Daylight)
      this.checkDaylight(this.obj.state.daylight)
    }
    if (this.obj.state.sunrise !== undefined) {
      this.service.addOptionalCharacteristic(my.Characteristics.Sunrise)
      this.checkSunrise(this.obj.state.sunrise)
    }
    if (this.obj.state.sunset !== undefined) {
      this.service.addOptionalCharacteristic(my.Characteristics.Sunset)
      this.checkSunset(this.obj.state.sunset)
    }
    if (this.obj.state.tampered !== undefined && this.type.history !== 'door') {
      this.service.addOptionalCharacteristic(Characteristic.StatusTampered)
      this.checkTampered(this.obj.state.tampered)
    }
    if (this.obj.state.current !== undefined) {
      this.service.addOptionalCharacteristic(eve.Characteristics.ElectricCurrent)
      this.checkCurrent(this.obj.state.current)
    }
    if (this.obj.state.voltage !== undefined) {
      this.service.addOptionalCharacteristic(eve.Characteristics.Voltage)
      this.checkVoltage(this.obj.state.voltage)
    }
    if (this.obj.state.on !== undefined) {
      this.checkStateOn(this.obj.state.on)
    }
    if (this.obj.state.valve !== undefined) {
      this.service.addOptionalCharacteristic(eve.Characteristics.ValvePosition)
      this.checkValve(this.obj.state.valve)
    }
    if (
      this.obj.state.daylight !== undefined &&
      this.obj.state.status !== undefined
    ) {
      this.service.addOptionalCharacteristic(my.Characteristics.Status)
      this.service.getCharacteristic(my.Characteristics.Status)
        .setProps({
          minValue: 100,
          maxValue: 230,
          perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
        })
      this.service.addOptionalCharacteristic(my.Characteristics.LastEvent)
      this.service.addOptionalCharacteristic(my.Characteristics.Period)
      this.checkStatus(this.obj.state.status)
    }
    if (this.obj.config[this.type.durationKey] !== undefined) {
      this.checkDuration(this.obj.config[this.type.durationKey])
      this.service.getCharacteristic(eve.Characteristics.Duration)
        .on('set', this.setDuration.bind(this))
      delete this.duration
    } else if (this.duration !== undefined) {
      // Add fake duration for Hue motion sensor connected to the Hue bridge
      this.hk.duration = 5
      this.service.getCharacteristic(eve.Characteristics.Duration)
        .setValue(this.hk.duration)
        .on('set', this.setDuration.bind(this))
    }
    if (
      this.obj.config.sensitivity !== undefined &&
      this.obj.type !== 'ZHASwitch'
    ) {
      this.checkSensitivity(this.obj.config.sensitivity)
      if (this.type.sensitivitymax != null) {
        this.service.getCharacteristic(eve.Characteristics.Sensitivity)
          .on('set', this.setSensitivity.bind(this))
      }
    }
    if (this.type.key === 'temperature' && this.obj.config.offset !== undefined) {
      this.service.addOptionalCharacteristic(my.Characteristics.Offset)
      this.checkOffset(this.obj.config.offset)
      this.service.getCharacteristic(my.Characteristics.Offset)
        .on('set', this.setOffset.bind(this))
    }
    if (this.obj.config.heatsetpoint !== undefined) {
      this.service.getCharacteristic(Characteristic.CurrentHeatingCoolingState)
        .setProps({
          validValues: [
            Characteristic.CurrentHeatingCoolingState.OFF,
            Characteristic.CurrentHeatingCoolingState.HEAT
          ]
        })
      this.service.getCharacteristic(Characteristic.TargetHeatingCoolingState)
        .setProps({
          validValues: [
            Characteristic.TargetHeatingCoolingState.OFF,
            Characteristic.TargetHeatingCoolingState.HEAT
          ]
        })
        .on('set', this.setTargetHeatingCoolingState.bind(this))
      this.checkMode(this.obj.config.mode)
      if (this.obj.config.schedule_on !== undefined) {
        this.checkScheduleOn(this.obj.config.schedule_on)
      }
      this.service.getCharacteristic(Characteristic.TargetTemperature)
        .setProps({ minValue: 5, maxValue: 30, minStep: 0.5 })
        .on('set', this.setTargetTemperature.bind(this))
      this.checkHeatSetPoint(this.obj.config.heatsetpoint)
      this.service.addOptionalCharacteristic(eve.Characteristics.ProgramCommand)
      this.service.getCharacteristic(eve.Characteristics.ProgramCommand)
        .on('set', this.setProgramCommand.bind(this))
      this.service.addOptionalCharacteristic(eve.Characteristics.ProgramData)
      this.service.getCharacteristic(eve.Characteristics.ProgramData)
        // .setValue(Buffer.from('ff04f6', 'hex').toString('base64'))
        .on('get', this.getProgramData.bind(this))
    }
    if (this.obj.config.displayflipped !== undefined) {
      this.service.addOptionalCharacteristic(Characteristic.ImageMirroring)
      this.checkDisplayFlipped(this.obj.config.displayflipped)
      this.service.getCharacteristic(Characteristic.ImageMirroring)
        .on('set', this.setMirroring.bind(this))
    }
    if (this.obj.config.locked !== undefined) {
      this.service.addOptionalCharacteristic(Characteristic.LockPhysicalControls)
      this.checkLocked(this.obj.config.locked)
      this.service.getCharacteristic(Characteristic.LockPhysicalControls)
        .on('set', this.setLocked.bind(this))
    }
    this.service.addOptionalCharacteristic(Characteristic.StatusFault)
    this.checkReachable(this.obj.config.reachable)
    this.service.addOptionalCharacteristic(Characteristic.StatusActive)
    this.service.addOptionalCharacteristic(my.Characteristics.Enabled)
    this.checkOn(this.obj.config.on)
    this.service.getCharacteristic(my.Characteristics.Enabled)
      .on('set', this.setEnabled.bind(this))
    if (
      this.bridge.platform.config.resource &&
      !this.service.testCharacteristic(my.Characteristics.Resource)
    ) {
      this.service.addOptionalCharacteristic(my.Characteristics.Resource)
      this.service.getCharacteristic(my.Characteristics.Resource)
        .updateValue(this.resource)
    }
    if (
      this.bridge.platform.config.configuredName &&
      !this.service.testCharacteristic(Characteristic.ConfiguredName)
    ) {
      this.service.addCharacteristic(Characteristic.ConfiguredName)
      // this.service.addOptionalCharacteristic(Characteristic.ConfiguredName)
      // this.service.getCharacteristic(Characteristic.ConfiguredName)
      //   .on('set', this.setName.bind(this))
    }
  }
  if (this.obj.config.battery !== undefined) {
    this.batteryService = this.accessory.getBatteryService(
      this.obj.config.battery
    )
  }
}