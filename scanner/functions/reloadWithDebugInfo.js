function reloadWithDebugInfo() {
  window.name = 'NG_ENABLE_DEBUG_INFO!' + window.name;
  window.location.reload();
}