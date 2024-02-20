function postProcessUIConfig(msg) {
  if (msg && msg.ui_config) {
    for (const entry of Object.keys(msg.ui_config)) {
      msg.ui_config[entry] = XVIZ_PROTOBUF_TYPE.UIPanelInfo.toObject(msg.ui_config[entry]);
    }
  }
}