function j3(e,t,r,n){var i=e.stateNode;i.props=r,i.state=e.memoizedState,i.refs=Lj,YT(e);var a=t.contextType;typeof a=="object"&&a!==null?i.context=Pa(a):(a=Li(t)?du:ui.current,i.context=Lc(e,a)),i.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(z3(e,t,a,r),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&h1.enqueueReplaceState(i,i.state,null),kg(e,r,i,n),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}