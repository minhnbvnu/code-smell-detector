function createCapability(user) {
    var capability = new Twilio.Capability(config.twilio.sid, config.twilio.token);
    capability.allowClientOutgoing(config.twilio.app);
    capability.allowClientIncoming(user.username);
    return capability.generate();
}