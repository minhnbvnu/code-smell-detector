function iss8() {
  if (proxy) {
    proxy.guid = fn.guid = fn.guid || jQuery.guid++;
  }
}