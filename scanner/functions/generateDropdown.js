function generateDropdown (customProps, trigger, contents) {
    const dropdownOption = {
      ref: dropdown,
      border: true,
      disabled: props.disabled,
      customTriggerClass: props?.customTriggerClass,
      customContainerClass: props?.customContainerClass,
      onVisibleChange (val) { visible.value = val }
    }
    return h(Dropdown, mergeProps(dropdownOption, customProps), {
      trigger: () => trigger,
      default: () => contents
    })
  }