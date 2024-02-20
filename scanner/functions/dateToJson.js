function dateToJson() {
	return reviverWrap(`<Date ${this.toISOString()}>`)
}