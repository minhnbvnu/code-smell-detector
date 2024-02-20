function ZPe(e){try{return Mi(`netsh wlan show  interface name="${e}" | findstr "SSID"`,Rt.execOptsWin).split(`\r
`).shift().split(":").pop()}catch{return"Unknown"}}