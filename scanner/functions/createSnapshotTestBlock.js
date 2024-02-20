function createSnapshotTestBlock(code, config = {}) {
    const defaultConfig = {
        loc: true,
        range: true,
        raw: true,
        tokens: true,
        comment: true,
        errorOnUnknownASTType: true,
        sourceType: "module"
    };
    config = Object.assign({}, defaultConfig, config);

    /**
     * @returns {Object} the AST object
     */
    function parse() {
        const ast = parser.parseForESLint(code, config).ast;
        return getRaw(ast);
    }

    return () => {
        try {
            const result = parse();
            expect(result).toMatchSnapshot();
        } catch (e) {
            /**
             * If we are deliberately throwing because of encountering an unknown
             * AST_NODE_TYPE, we rethrow to cause the test to fail
             */
            if (e.message.match("Unknown AST_NODE_TYPE")) {
                throw new Error(e);
            }
            expect(parse).toThrowErrorMatchingSnapshot();
        }
    };

}