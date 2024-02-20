function prelude_esm() {
        return `\
${comment(license)}
const main = ${loader}\
`;
    }