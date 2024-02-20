function __link__(node, tag, args)
        {
            tag.tag.compile();

            var domArgs = [node, tag.tag.context, 0];
            domArgs.push.apply(domArgs, tag.tag.domArgs);
            domArgs.push.apply(domArgs, args);

            return tag.tag.renderDOM.apply(tag.tag.subject, domArgs);
        }