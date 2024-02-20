function typeName(value) {
              {
                var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
                var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
                return type;
              }
            }