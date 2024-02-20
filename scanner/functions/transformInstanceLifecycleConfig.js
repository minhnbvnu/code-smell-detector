function transformInstanceLifecycleConfig(InstanceLifecycleConfig) {
  const emptyProp = {
    'Handler': ''
  };
  return {
    'PreFreeze': (InstanceLifecycleConfig && InstanceLifecycleConfig.PreFreeze) ? InstanceLifecycleConfig.PreFreeze : emptyProp,
    'PreStop': (InstanceLifecycleConfig && InstanceLifecycleConfig.PreStop) ? InstanceLifecycleConfig.PreStop : emptyProp
  };
}