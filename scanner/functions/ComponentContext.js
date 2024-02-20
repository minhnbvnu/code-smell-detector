function ComponentContext(calendar, theme, dateEnv, options, view) {
            this.calendar = calendar;
            this.theme = theme;
            this.dateEnv = dateEnv;
            this.options = options;
            this.view = view;
            this.isRtl = options.dir === 'rtl';
            this.eventOrderSpecs = parseFieldSpecs(options.eventOrder);
            this.nextDayThreshold = createDuration(options.nextDayThreshold);
        }