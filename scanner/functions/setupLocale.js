function setupLocale() {
            if (typeof self.config.locale !== "object" &&
                typeof flatpickr.l10ns[self.config.locale] === "undefined")
                self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
            self.l10n = __assign(__assign({}, flatpickr.l10ns.default), (typeof self.config.locale === "object"
                ? self.config.locale
                : self.config.locale !== "default"
                    ? flatpickr.l10ns[self.config.locale]
                    : undefined));
            formatting_1.tokenRegex.D = "(" + self.l10n.weekdays.shorthand.join("|") + ")";
            formatting_1.tokenRegex.l = "(" + self.l10n.weekdays.longhand.join("|") + ")";
            formatting_1.tokenRegex.M = "(" + self.l10n.months.shorthand.join("|") + ")";
            formatting_1.tokenRegex.F = "(" + self.l10n.months.longhand.join("|") + ")";
            formatting_1.tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
            var userConfig = __assign(__assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
            if (userConfig.time_24hr === undefined &&
                flatpickr.defaultConfig.time_24hr === undefined) {
                self.config.time_24hr = self.l10n.time_24hr;
            }
            self.formatDate = (0, dates_1.createDateFormatter)(self);
            self.parseDate = (0, dates_1.createDateParser)({ config: self.config, l10n: self.l10n });
        }