function deeper(node, find)
      {
         var look = null;

         if (node) {
            if (node.name == find)
            {
               return node;
            }

            if (node.firstChild())
            {
               look = deeper(node.firstChild(), find);
            }

            if (!look && node.nextSibling())
            {
               look = deeper(node.nextSibling(), find);
            }
         }

         return look;
      }