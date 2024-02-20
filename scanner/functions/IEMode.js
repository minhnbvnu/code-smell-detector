function IEMode(ua){
  if(!WebRules.re_msie.test(ua)){ return null; }

  let m;
  let engineMode;
  let engineVersion;
  let browserMode;
  let browserVersion;

  // IE8 及其以上提供有 Trident 信息，
  // 默认的兼容模式，UA 中 Trident 版本不发生变化。
  if(ua.indexOf("trident/") !== -1){
    m = /\btrident\/([0-9.]+)/.exec(ua);
    if (m && m.length >= 2) {
      // 真实引擎版本。
      engineVersion = m[1];
      const v_version = m[1].split(".");
      v_version[0] = parseInt(v_version[0], 10) + 4;
      browserVersion = v_version.join(".");
    }
  }

  m = WebRules.re_msie.exec(ua);
  browserMode = m[1];
  const v_mode = m[1].split(".");
  if (typeof browserVersion === "undefined") {
    browserVersion = browserMode;
  }
  v_mode[0] = parseInt(v_mode[0], 10) - 4;
  engineMode = v_mode.join(".");
  if (typeof engineVersion === "undefined") {
    engineVersion = engineMode;
  }

  return {
    browserVersion: browserVersion,
    browserMode: browserMode,
    engineVersion: engineVersion,
    engineMode: engineMode,
    compatible: engineVersion !== engineMode,
  };
}