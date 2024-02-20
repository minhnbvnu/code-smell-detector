function handle_kernel_cleanup(event, handle) {
  delete PyViz.comms["hv-extension-comm"];
  window.PyViz.plot_index = {}
}