function Localization(locale, numberOptions, dateOptions) {
    this.locale = locale;

    /**
     * @name number
     * @see The {@link NumberFormatter|NumberFormatter} class
     * @memberOf Localization.prototype
     */
    this.int = this.float = this.construct('number', NumberFormatter, numberOptions);

    /**
     * @see The {@link DateFormatter|DateFormatter} class
     * @memberOf Localization.prototype
     */
    this.construct('date', DateFormatter, dateOptions);
}