function generateExamples(title, examples) {
    process.stdout.write(`\n  Examples for ${title}:`);
    const spaceify = number => new Array(!number || number < 0 ? 0 : number + 1).join(' ');
    const spaces = spaceify(6);
    const descriptionPlaceholder = spaceify(Math.max(...examples.map(({ description }) => description ? description.length : 0)));

    examples.forEach(({ name, description, code }) => {
        const tabs = spaceify(descriptionPlaceholder.length - (description ? description.length : 0));

        if (name) {
            process.stdout.write(`\n\n    ${chalk.blue(name)}:\n`);
        }

        if (description) {
            process.stdout.write(`\n${spaces}${description}`);
        } else {
            process.stdout.write(spaces);
        }

        if (code) {
            process.stdout.write(`${tabs}${spaces}${chalk.green(`$ ${code}`)}\n`);
        }
    });
}