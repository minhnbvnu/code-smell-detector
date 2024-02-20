function DNSRR(is_question) {
    this.name = "";
    this.type = null;
    this.class = null;
    this.ttl = null;
    this.rdlength = null;
    this.rdata = null;
    this.is_question = is_question;
}