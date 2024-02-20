function OwnersListContextController({
  children
}) {
  const bridge = Object(react["useContext"])(BridgeContext);
  const store = Object(react["useContext"])(StoreContext);
  const {
    ownerID
  } = Object(react["useContext"])(TreeStateContext);
  const read = Object(react["useCallback"])(id => {
    const element = store.getElementByID(id);

    if (element !== null) {
      return resource.read(element);
    } else {
      return null;
    }
  }, [store]);
  Object(react["useEffect"])(() => {
    const onOwnersList = ownersList => {
      const id = ownersList.id;
      const element = store.getElementByID(id);

      if (element !== null) {
        const request = inProgressRequests.get(element);

        if (request != null) {
          inProgressRequests.delete(element);
          request.resolveFn(ownersList.owners === null ? null : ownersList.owners.map(owner => {
            const [displayNameWithoutHOCs, hocDisplayNames] = Object(utils["u" /* separateDisplayNameAndHOCs */])(owner.displayName, owner.type);
            return { ...owner,
              displayName: displayNameWithoutHOCs,
              hocDisplayNames
            };
          }));
        }
      }
    };

    bridge.addListener('ownersList', onOwnersList);
    return () => bridge.removeListener('ownersList', onOwnersList);
  }, [bridge, store]); // This effect requests an updated owners list any time the selected owner changes

  Object(react["useEffect"])(() => {
    if (ownerID !== null) {
      const rendererID = store.getRendererIDForElement(ownerID);

      if (rendererID !== null) {
        bridge.send('getOwnersList', {
          id: ownerID,
          rendererID
        });
      }
    }

    return () => {};
  }, [bridge, ownerID, store]);
  return /*#__PURE__*/react["createElement"](OwnersListContext.Provider, {
    value: read
  }, children);
}