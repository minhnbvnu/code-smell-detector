function localGet() {
          return localDB.get(resp.id)
            // document not yet replicated
            .catch(localGet);
        }