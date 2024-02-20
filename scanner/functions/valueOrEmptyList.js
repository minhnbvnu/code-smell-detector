function valueOrEmptyList(value) {
            return _immutable.List.isList(value) ? value : (0, _immutable.List)()
        }