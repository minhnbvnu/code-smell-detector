function handle_update_output(event, handle) {
  handle_clear_output(event, {cell: {output_area: handle.output_area}})
  handle_add_output(event, handle)
}