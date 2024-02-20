function CArrayGen(type, length)
    {
        var size = type.size;
        var load_fun = type.load_fun;
        var store_fun = type.store_fun;
        var wrapper_fun;

        if (type.name === 'char')
        {
            // Special case toString for char[]
            wrapper_fun =
               `(function(c, string)
                 {
                     var arrProto = {};
                     arrProto.toString = function()
                     {
                      return string(this.ptr, 0, this.offset);
                     };
                     arrProto.toJS = arrProto.toString;`;
        }
        else
        {
            // toString for other types
            wrapper_fun =
               `(function(c)
                 {
                     var arrProto = {};

                     arrProto.toString = function()
                     {
                         var arr_string = '[ ' + this.get(0).toString();
                         var i = 1;
                         var l = this.length;
                         while (i < l)
                         {
                             arr_string += ', ' + this.get(i).toString();
                             i += 1;
                         }
                         arr_string += ' ]';
                         return arr_string;
                     };

                     arrProto.toJS = function()
                     {
                         var a = [];
                         var i = 0;
                         var l = this.length;
                         while (i < l)
                         {
                          a.push(this.get(i));
                          i += 1;
                         }
                         return a;
                     };`;
        }

        // get/set functions and constructor
        wrapper_fun +=
           `arrProto.get = function(index)
            {
                return ` + load_fun + `(this.ptr, this.offset + (` + size + ` * index));
            };
            arrProto.set = function(index, val)
            {
                return ` + store_fun + `(this.ptr, this.offset + (` + size + ` * index), val);
            };
            return (function(ptr, offset)
            {
                var arr = Object.create(arrProto);

                if ($ir_is_rawptr(ptr))
                {
                    arr.ptr = ptr;
                    arr.offset = offset || 0;
                    arr.length = ` + length + `;
                }
                else
                {
                    arr.ptr = c.malloc(` + (length * size) + ` )
                    arr.offset = 0;
                }
                return arr;
            });
        })`;

        // The wrapper needs acces to the c object for c.malloc and string for toString
        return eval(wrapper_fun)(c, string);
    }