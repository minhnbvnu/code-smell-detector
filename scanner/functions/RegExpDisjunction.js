function RegExpDisjunction (
    captures,
    isRoot,
    groupId
)
{
    this.alternatives = [];
    this.captures = captures;
    this.isRoot= isRoot;
    this.groupId = groupId;
}