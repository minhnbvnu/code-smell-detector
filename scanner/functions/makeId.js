function makeId(responseState, treeId, localId) {
              var idPrefix = responseState.idPrefix;
              var id = ":" + idPrefix + "R" + treeId;
              if (localId > 0) {
                id += "H" + localId.toString(32);
              }
              return id + ":";
            }