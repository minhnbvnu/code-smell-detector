function _gethostbyaddr(addr,addrlen,type){if(type!==2){setErrNo(5);return null}addr=HEAP32[addr>>2];var host=inetNtop4(addr);var lookup=DNS.lookup_addr(host);if(lookup){host=lookup}return getHostByName(host)}