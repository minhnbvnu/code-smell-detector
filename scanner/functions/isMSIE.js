function isMSIE() {
  return (navigator && navigator.userAgent &&
      navigator.userAgent.search(/MSIE/) !== -1);
}