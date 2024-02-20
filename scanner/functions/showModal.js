function showModal(component, hide, titleText, buttonText, icon, titleColor, hideButton){
    return {type: SHOW_MODAL, modalProps: {closeBtnText: buttonText, component, titleColor, modalTitle: titleText, hideCloseBtn: hideButton, hide, icon}}
}