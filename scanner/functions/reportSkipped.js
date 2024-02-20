function reportSkipped(config, skipped=[]){
  let started = false;
  const ui = new PluginUI(config.logger.log);

  for (let item of skipped){
    if (!started) {
      ui.report('instr-skip', []);
      started = true;
    }
    ui.report('instr-skipped', [item.relativePath]);
  }
}