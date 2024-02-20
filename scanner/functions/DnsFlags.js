function DnsFlags() {
    // is this a response?
    this.isResponse = undefined;

    // 0 == Query
    // 1 == Inverse query
    // 2 == Status
    // 3-15 Reserved for future use
    this.opcode = undefined;

    // is the server the authority for the domain?
    this.isAuthority = undefined;

    // is this message truncated?
    this.isTruncated = undefined;

    // should name server recursively
    // resolve domain?
    this.isRecursionDesired = undefined;

    // Can the server even do recursion?
    this.isRecursionAvailible = undefined;

    // Reserved for future use, unless the present is the future
    // then assume the past is the present and the present is the
    // past...or just update to support whatever this became.
    //
    // currently "should" always be zero.
    this.z = undefined;

    // 0 == no error
    // 1 == format error (query could not be interpeted)
    // 2 == server error
    // 3 == name error (domain requested by query does not exist)
    // 4 == unsupported request
    // 5 == refused
    // a 4bit reply status code
    this.responseCode = undefined;
}