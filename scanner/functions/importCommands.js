function importCommands(module) {
    for (var k in module) {
        vg[k] = module[k];
    }
}