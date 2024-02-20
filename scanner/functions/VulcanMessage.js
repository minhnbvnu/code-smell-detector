function VulcanMessage(type)
{
    this.type = type;
    this.scope = VulcanMessage.SCOPE_SUITE;
    this.appId = VulcanMessage.DEFAULT_APP_ID;
	this.appVersion = VulcanMessage.DEFAULT_APP_VERSION;
    this.data = VulcanMessage.DEFAULT_DATA;
}