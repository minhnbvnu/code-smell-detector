function nickGetClasses(nickMsg) {
        return {
            'name': nickGetColorClasses(nickMsg, 'color'),
            'prefix': nickGetColorClasses(nickMsg, 'prefix_color')
        };
    }