function useEvent (emit) {
  return {
    emitUpdateModelValue: data => emit('update:modelValue', regionToModel(data)),
    emitChange: data => emit('change', data)
  }
}