function $Te(e){try{return qi(`netsh wlan show  interface name="${e}" | findstr "SSID"`,Bt.execOptsWin).split(`\r
`).shift().split(":").pop()}catch{return"Unknown"}}