function stateName(node) {
            var name = node.name.split(".").pop();
            if (node.sticky) { name += " (STICKY)"; }
            if (node.deepStateRedirect) { name += " (DSR)"; }
            return name;
          }