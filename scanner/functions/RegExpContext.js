function RegExpContext (
    input,
    captures
)
{
    this.input = input;
    this.index = 0;
    this.currentCharCode = input.charCodeAt(0);
    this.captures = captures;
    this.backtrackStack = [];
}