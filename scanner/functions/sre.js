function sre(e,t){let r={rx:0,wx:0,tx:0,rx_sec:-1,wx_sec:-1,tx_sec:-1,ms:0};return br&&br.ms?(r.rx=e,r.wx=t,r.tx=r.rx+r.wx,r.ms=Date.now()-br.ms,r.rx_sec=(r.rx-br.bytes_read)/(r.ms/1e3),r.wx_sec=(r.wx-br.bytes_write)/(r.ms/1e3),r.tx_sec=r.rx_sec+r.wx_sec,br.rx_sec=r.rx_sec,br.wx_sec=r.wx_sec,br.tx_sec=r.tx_sec,br.bytes_read=r.rx,br.bytes_write=r.wx,br.bytes_overall=r.rx+r.wx,br.ms=Date.now(),br.last_ms=r.ms):(r.rx=e,r.wx=t,r.tx=r.rx+r.wx,br.rx_sec=-1,br.wx_sec=-1,br.tx_sec=-1,br.bytes_read=r.rx,br.bytes_write=r.wx,br.bytes_overall=r.rx+r.wx,br.ms=Date.now(),br.last_ms=0),r}