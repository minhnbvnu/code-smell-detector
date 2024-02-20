function getTreeId(context) {
              var overflow = context.overflow;
              var idWithLeadingBit = context.id;
              var id = idWithLeadingBit & ~getLeadingBit(idWithLeadingBit);
              return id.toString(32) + overflow;
            }