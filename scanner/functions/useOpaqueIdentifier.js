function useOpaqueIdentifier() {
            return (currentPartialRenderer.identifierPrefix || "") + "R:" + (currentPartialRenderer.uniqueID++).toString(36);
          }