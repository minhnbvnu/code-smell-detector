function _base32decode(e){var r=0,t=core.ZERO(),n=e.length;for(r=0;n>0&&255>r;r+=5){n--;var o=_BASE32VALUES[e.substr(n,1)];core.setbit(t,r,1&o),o>>=1,core.setbit(t,r+1,1&o),o>>=1,core.setbit(t,r+2,1&o),o>>=1,core.setbit(t,r+3,1&o),o>>=1,core.setbit(t,r+4,1&o)}return t}