function modalReducer(state =(<div></div>), action) {
    switch (action.type) {
        case SHOW_MODAL :
            return (<Modal {...action.modalProps}/>);
        case HIDE_MODAL :
            return (<div></div>);
        default:
            return state;
    }
}