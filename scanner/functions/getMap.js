function getMap () {
  let map = {
    17: 'CmdOrCtrl',
    32: 'Space',
    37: 'Left',
    38: 'Up',
    39: 'Right',
    40: 'Down',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    get 91 () {
      if (process.platform !== 'darwin') {
        return 'Super'
      } else {
        return 'Cmd'
      }
    }
  }
  return map
}