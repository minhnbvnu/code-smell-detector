function describeFiber(workTagMap, workInProgress, currentDispatcherRef) {
  const {
    HostComponent,
    LazyComponent,
    SuspenseComponent,
    SuspenseListComponent,
    FunctionComponent,
    IndeterminateComponent,
    SimpleMemoComponent,
    ForwardRef,
    ClassComponent
  } = workTagMap;
  const owner =  false ? undefined : null;

  switch (workInProgress.tag) {
    case HostComponent:
      return describeBuiltInComponentFrame(workInProgress.type, owner);

    case LazyComponent:
      return describeBuiltInComponentFrame('Lazy', owner);

    case SuspenseComponent:
      return describeBuiltInComponentFrame('Suspense', owner);

    case SuspenseListComponent:
      return describeBuiltInComponentFrame('SuspenseList', owner);

    case FunctionComponent:
    case IndeterminateComponent:
    case SimpleMemoComponent:
      return describeFunctionComponentFrame(workInProgress.type, owner, currentDispatcherRef);

    case ForwardRef:
      return describeFunctionComponentFrame(workInProgress.type.render, owner, currentDispatcherRef);

    case ClassComponent:
      return describeClassComponentFrame(workInProgress.type, owner, currentDispatcherRef);

    default:
      return '';
  }
}