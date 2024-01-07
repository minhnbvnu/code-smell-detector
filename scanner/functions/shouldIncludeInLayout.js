function shouldIncludeInLayout(element) {
        const layoutChildComponent = element.entity.layoutchild;

        return !layoutChildComponent || !layoutChildComponent.enabled || !layoutChildComponent.excludeFromLayout;
    }