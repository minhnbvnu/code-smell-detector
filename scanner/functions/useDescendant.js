function useDescendant(descendant, context, indexProp) {
  var forceUpdate = useForceUpdate();

  var _React$useContext = Object(react["useContext"])(context),
      registerDescendant = _React$useContext.registerDescendant,
      unregisterDescendant = _React$useContext.unregisterDescendant,
      descendants = _React$useContext.descendants; // This will initially return -1 because we haven't registered the descendant
  // on the first render. After we register, this will then return the correct
  // index on the following render and we will re-register descendants so that
  // everything is up-to-date before the user interacts with a collection.


  var index = indexProp != null ? indexProp : descendants.findIndex(function (item) {
    return item.element === descendant.element;
  }); // Prevent any flashing

  useIsomorphicLayoutEffect(function () {
    if (!descendant.element) forceUpdate();
    registerDescendant(reach_descendants_esm_extends({}, descendant, {
      index: index
    }));
    return function () {
      unregisterDescendant(descendant.element);
    };
  }, [descendant, forceUpdate, index, registerDescendant, unregisterDescendant].concat(Object.values(descendant)));
  return index;
}