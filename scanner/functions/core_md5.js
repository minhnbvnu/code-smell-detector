function core_md5(d,_){d[_>>5]|=128<<_%32,d[(_+64>>>9<<4)+14]=_;for(var m=1732584193,f=-271733879,i=-1732584194,h=271733878,r=0;r<d.length;r+=16){var g=m,n=f,e=i,a=h;m=md5_ff(m,f,i,h,d[r+0],7,-680876936),h=md5_ff(h,m,f,i,d[r+1],12,-389564586),i=md5_ff(i,h,m,f,d[r+2],17,606105819),f=md5_ff(f,i,h,m,d[r+3],22,-1044525330),m=md5_ff(m,f,i,h,d[r+4],7,-176418897),h=md5_ff(h,m,f,i,d[r+5],12,1200080426),i=md5_ff(i,h,m,f,d[r+6],17,-1473231341),f=md5_ff(f,i,h,m,d[r+7],22,-45705983),m=md5_ff(m,f,i,h,d[r+8],7,1770035416),h=md5_ff(h,m,f,i,d[r+9],12,-1958414417),i=md5_ff(i,h,m,f,d[r+10],17,-42063),f=md5_ff(f,i,h,m,d[r+11],22,-1990404162),m=md5_ff(m,f,i,h,d[r+12],7,1804603682),h=md5_ff(h,m,f,i,d[r+13],12,-40341101),i=md5_ff(i,h,m,f,d[r+14],17,-1502002290),f=md5_ff(f,i,h,m,d[r+15],22,1236535329),m=md5_gg(m,f,i,h,d[r+1],5,-165796510),h=md5_gg(h,m,f,i,d[r+6],9,-1069501632),i=md5_gg(i,h,m,f,d[r+11],14,643717713),f=md5_gg(f,i,h,m,d[r+0],20,-373897302),m=md5_gg(m,f,i,h,d[r+5],5,-701558691),h=md5_gg(h,m,f,i,d[r+10],9,38016083),i=md5_gg(i,h,m,f,d[r+15],14,-660478335),f=md5_gg(f,i,h,m,d[r+4],20,-405537848),m=md5_gg(m,f,i,h,d[r+9],5,568446438),h=md5_gg(h,m,f,i,d[r+14],9,-1019803690),i=md5_gg(i,h,m,f,d[r+3],14,-187363961),f=md5_gg(f,i,h,m,d[r+8],20,1163531501),m=md5_gg(m,f,i,h,d[r+13],5,-1444681467),h=md5_gg(h,m,f,i,d[r+2],9,-51403784),i=md5_gg(i,h,m,f,d[r+7],14,1735328473),f=md5_gg(f,i,h,m,d[r+12],20,-1926607734),m=md5_hh(m,f,i,h,d[r+5],4,-378558),h=md5_hh(h,m,f,i,d[r+8],11,-2022574463),i=md5_hh(i,h,m,f,d[r+11],16,1839030562),f=md5_hh(f,i,h,m,d[r+14],23,-35309556),m=md5_hh(m,f,i,h,d[r+1],4,-1530992060),h=md5_hh(h,m,f,i,d[r+4],11,1272893353),i=md5_hh(i,h,m,f,d[r+7],16,-155497632),f=md5_hh(f,i,h,m,d[r+10],23,-1094730640),m=md5_hh(m,f,i,h,d[r+13],4,681279174),h=md5_hh(h,m,f,i,d[r+0],11,-358537222),i=md5_hh(i,h,m,f,d[r+3],16,-722521979),f=md5_hh(f,i,h,m,d[r+6],23,76029189),m=md5_hh(m,f,i,h,d[r+9],4,-640364487),h=md5_hh(h,m,f,i,d[r+12],11,-421815835),i=md5_hh(i,h,m,f,d[r+15],16,530742520),f=md5_hh(f,i,h,m,d[r+2],23,-995338651),m=md5_ii(m,f,i,h,d[r+0],6,-198630844),h=md5_ii(h,m,f,i,d[r+7],10,1126891415),i=md5_ii(i,h,m,f,d[r+14],15,-1416354905),f=md5_ii(f,i,h,m,d[r+5],21,-57434055),m=md5_ii(m,f,i,h,d[r+12],6,1700485571),h=md5_ii(h,m,f,i,d[r+3],10,-1894986606),i=md5_ii(i,h,m,f,d[r+10],15,-1051523),f=md5_ii(f,i,h,m,d[r+1],21,-2054922799),m=md5_ii(m,f,i,h,d[r+8],6,1873313359),h=md5_ii(h,m,f,i,d[r+15],10,-30611744),i=md5_ii(i,h,m,f,d[r+6],15,-1560198380),f=md5_ii(f,i,h,m,d[r+13],21,1309151649),m=md5_ii(m,f,i,h,d[r+4],6,-145523070),h=md5_ii(h,m,f,i,d[r+11],10,-1120210379),i=md5_ii(i,h,m,f,d[r+2],15,718787259),f=md5_ii(f,i,h,m,d[r+9],21,-343485551),m=safe_add(m,g),f=safe_add(f,n),i=safe_add(i,e),h=safe_add(h,a)}return Array(m,f,i,h)}