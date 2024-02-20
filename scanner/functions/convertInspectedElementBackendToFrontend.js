function convertInspectedElementBackendToFrontend(inspectedElementBackend) {
  const {
    canEditFunctionProps,
    canEditFunctionPropsDeletePaths,
    canEditFunctionPropsRenamePaths,
    canEditHooks,
    canEditHooksAndDeletePaths,
    canEditHooksAndRenamePaths,
    canToggleError,
    isErrored,
    targetErrorBoundaryID,
    canToggleSuspense,
    canViewSource,
    hasLegacyContext,
    id,
    source,
    type,
    owners,
    context,
    hooks,
    plugins,
    props,
    rendererPackageName,
    rendererVersion,
    rootType,
    state,
    key,
    errors,
    warnings
  } = inspectedElementBackend;
  const inspectedElement = {
    canEditFunctionProps,
    canEditFunctionPropsDeletePaths,
    canEditFunctionPropsRenamePaths,
    canEditHooks,
    canEditHooksAndDeletePaths,
    canEditHooksAndRenamePaths,
    canToggleError,
    isErrored,
    targetErrorBoundaryID,
    canToggleSuspense,
    canViewSource,
    hasLegacyContext,
    id,
    key,
    plugins,
    rendererPackageName,
    rendererVersion,
    rootType,
    source,
    type,
    owners: owners === null ? null : owners.map(owner => {
      const [displayName, hocDisplayNames] = Object(utils["u" /* separateDisplayNameAndHOCs */])(owner.displayName, owner.type);
      return { ...owner,
        displayName,
        hocDisplayNames
      };
    }),
    context: hydrateHelper(context),
    hooks: hydrateHelper(hooks),
    props: hydrateHelper(props),
    state: hydrateHelper(state),
    errors,
    warnings
  };
  return inspectedElement;
}