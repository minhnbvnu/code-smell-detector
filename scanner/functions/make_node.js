function make_node(ctor, orig, props) {
            if (!props)
                props = {};
            if (orig) {
                if (!props.start)
                    props.start = orig.start;
                if (!props.end)
                    props.end = orig.end;
            }
            return new ctor(props);
        }