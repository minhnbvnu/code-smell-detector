function __read_sockaddr(sa,salen){var family=HEAP16[sa>>1];var port=_ntohs(HEAP16[sa+2>>1]);var addr;switch(family){case 2:if(salen!==16){return{errno:ERRNO_CODES.EINVAL}}addr=HEAP32[sa+4>>2];addr=__inet_ntop4_raw(addr);break;case 10:if(salen!==28){return{errno:ERRNO_CODES.EINVAL}}addr=[HEAP32[sa+8>>2],HEAP32[sa+12>>2],HEAP32[sa+16>>2],HEAP32[sa+20>>2]];addr=__inet_ntop6_raw(addr);break;default:return{errno:ERRNO_CODES.EAFNOSUPPORT}}return{family:family,addr:addr,port:port}}