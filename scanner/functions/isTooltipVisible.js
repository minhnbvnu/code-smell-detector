function isTooltipVisible(id, initial) {
  return reach_tooltip_esm_state.context.id === id && (initial ? reach_tooltip_esm_state.value === TooltipStates.Visible : reach_tooltip_esm_state.value === TooltipStates.Visible || reach_tooltip_esm_state.value === TooltipStates.LeavingVisible);
}