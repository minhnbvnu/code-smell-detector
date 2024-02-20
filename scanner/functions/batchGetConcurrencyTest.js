async function batchGetConcurrencyTest() {
        // Total batch get size is 100. 430 records are used to ensure an odd number of requests are performed.
        let delay = 1000;
        let size = 430;
        let concurrent = 2;
        let totalBatches = Math.ceil(size / 100);
        let expectedConcurrencyPattern = [2, 2, 1]; // an element represents how many requests executed per second
        let records = makeRecords(size);
        let client = makeMockClient(delay);
        let MallStores = new Entity(schema, { client });
        let result = await MallStores.get(records).go({ concurrent });
        expect(result.data).to.be.an("array").and.to.have.length(totalBatches);
        expect(result.unprocessed).to.be.an("array").and.to.have.length(0);
        let concurrencyPattern = client.getOpConcurrency();
        expect(concurrencyPattern)
          .to.be.an("array")
          .with.length(expectedConcurrencyPattern.length);
        expect(concurrencyPattern)
          .to.be.an("array")
          .with.length(Math.ceil(totalBatches / concurrent));
        for (let i = 0; i < concurrencyPattern.length; i++) {
          let got = concurrencyPattern[i];
          let expected = expectedConcurrencyPattern[i];
          expect(got).to.equal(expected);
        }
      }