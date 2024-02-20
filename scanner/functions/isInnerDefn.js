function isInnerDefn(defn) {
                    return (defn.contextDep && contextDynamic) || defn.propDep;
                }