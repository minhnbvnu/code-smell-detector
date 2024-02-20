function stream(source, options) {
            assertPatternsInput(source);
            const works = getWorks(source, stream_1.default, options);
            /**
             * The stream returned by the provider cannot work with an asynchronous iterator.
             * To support asynchronous iterators, regardless of the number of tasks, we always multiplex streams.
             * This affects performance (+25%). I don't see best solution right now.
             */
            return utils.stream.merge(works);
        }