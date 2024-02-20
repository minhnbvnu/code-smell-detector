function allit(name, fn) {
        for (const consensus of ['pico', 'nano', 'light', 'full']) {
            it(`${name} (${consensus})`, async (done) => {
                fn(done, await clients[consensus], consensus);
            });
        }
    }