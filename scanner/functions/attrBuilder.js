function attrBuilder(el) {
  return {
    fieldName: `v-model="form.${el.fieldName}"`,
    clearable: el.clearable ? 'clearable' : '',
    placeholder: el.placeholder ? `placeholder="${el.placeholder}"` : '',
    width: el.style && el.style.width ? ':style="{width: \'100%\'}"' : '',
    disabled: el.disabled ? ':disabled=\'true\'' : ''
  }
}