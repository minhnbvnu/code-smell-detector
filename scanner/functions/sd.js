function Sd(a){var b=0;b=H[a+72>>2];H[a+72>>2]=b-1|b;b=H[a>>2];if(b&8){H[a>>2]=b|32;return-1}H[a+4>>2]=0;H[a+8>>2]=0;b=H[a+44>>2];H[a+28>>2]=b;H[a+20>>2]=b;H[a+16>>2]=b+H[a+48>>2];return 0}