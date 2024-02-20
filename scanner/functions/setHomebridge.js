function setHomebridge (homebridge, _my, _eve) {
  Service = homebridge.hap.Service
  Characteristic = homebridge.hap.Characteristic
  my = _my
  eve = _eve
  SINGLE = {
    minValue: Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS,
    maxValue: Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS,
    validValues: [
      Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS
    ]
  }
  SINGLE_DOUBLE = {
    minValue: Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS,
    maxValue: Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS,
    validValues: [
      Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS,
      Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS
    ]
  }
  SINGLE_LONG = {
    minValue: Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS,
    maxValue: Characteristic.ProgrammableSwitchEvent.LONG_PRESS,
    validValues: [
      Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS,
      Characteristic.ProgrammableSwitchEvent.LONG_PRESS
    ]
  }
  SINGLE_DOUBLE_LONG = {
    minValue: Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS,
    maxValue: Characteristic.ProgrammableSwitchEvent.LONG_PRESS,
    validValues: [
      Characteristic.ProgrammableSwitchEvent.SINGLE_PRESS,
      Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS,
      Characteristic.ProgrammableSwitchEvent.LONG_PRESS
    ]
  }
  // DOUBLE = {
  //   minValue: Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS,
  //   maxValue: Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS,
  //   validValues: [
  //     Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS
  //   ]
  // }
  // DOUBLE_LONG = {
  //   minValue: Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS,
  //   maxValue: Characteristic.ProgrammableSwitchEvent.LONG_PRESS,
  //   validValues: [
  //     Characteristic.ProgrammableSwitchEvent.DOUBLE_PRESS,
  //     Characteristic.ProgrammableSwitchEvent.LONG_PRESS
  //   ]
  // }
  LONG = {
    minValue: Characteristic.ProgrammableSwitchEvent.LONG_PRESS,
    maxValue: Characteristic.ProgrammableSwitchEvent.LONG_PRESS,
    validValues: [
      Characteristic.ProgrammableSwitchEvent.LONG_PRESS
    ]
  }

  airQualityValues = {
    excellent: Characteristic.AirQuality.EXCELLENT,
    good: Characteristic.AirQuality.GOOD,
    moderate: Characteristic.AirQuality.FAIR,
    poor: Characteristic.AirQuality.INFERIOR,
    unhealthy: Characteristic.AirQuality.POOR
  }
}