function dpe(e){e.peek()===0&&e.readByte();var t=Rr.readBitString(e),r={type:"ed25519",parts:[{name:"A",data:Rr.zeroPadToLength(t,32)}]};return new R0(r)}