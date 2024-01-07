function líneasNuevas(s) {
            return s.split('').join('\n').replace(/([\ud800-\udfff])\n([\ud800-\udfff])/g, '$1$2');
        }