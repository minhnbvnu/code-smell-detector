function useMutableSource(source, getSnapshot, subscribe) {
              resolveCurrentlyRenderingComponent();
              return getSnapshot(source._source);
            }