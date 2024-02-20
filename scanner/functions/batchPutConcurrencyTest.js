async function batchPutConcurrencyTest() {
        // Total batch write size is 25. 160 records are used to ensure an odd number of requests are performed.
        let delay = 1000;
        let size = 160;
        let concurrent = 2;
        let totalBatches = Math.ceil(size / 25);
        let expectedConcurrencyPattern = [2, 2, 2, 1]; // an element represents how many requests executed per second
        let records = makeRecords(size);
        let client = makeMockClient(delay);
        let MallStores = new Entity(schema, { client });
        let result = await MallStores.put(records).go({ concurrent });
        expect(result.unprocessed)
          .to.be.an("array")
          .and.to.have.length(totalBatches);
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