async function updateCoinmarketcapList() {
  const apiKey = process.env.COINMARKETCAP_API_KEY;
  let coinsIds = [];
  let coinsMarketCaps = {};
  const coinsArray = [];
  const coinsPerSubCall = 250; // how many coins (IDs) will be in the query string of coins metadata subcalls

  function delay(t) {
    return new Promise((resolve) => setTimeout(resolve, t));
  }

  // Call Coinmarketcap API
  try {
    // get only coins with market cap > 10M
    const response = await needle("get", ENDPOINTS.COINMARKETCAP, {
      headers: {
        "X-CMC_PRO_API_KEY": apiKey,
      },
    });
    response.body.data.forEach((coin) => {
      coinsMarketCaps[coin.id] = coin.quote.USD.market_cap;
      coinsIds.push(coin.id);
    });

    // divide total coins (IDs) to retrieve in chunks to create multiple calls to the coin metadata endpoint
    // this because coins Ids are passed to the endpoint as a query string param and query strings have a limit on their size/length
    const subcallsCoinsIds = arrayTo2DArray1(coinsIds, coinsPerSubCall);

    try {
      for (subcallCoinsIds of subcallsCoinsIds) {
        await delay(2500);
        const response = await needle(
          "get",
          `${ENDPOINTS.COINMARKETCAP_COIN_INFO}${subcallCoinsIds.join(",")}`,
          {
            headers: {
              "X-CMC_PRO_API_KEY": apiKey,
            },
          }
        );

        Object.keys(response.body.data).forEach((coinId) => {
          coinsArray.push([
            response.body.data[coinId].name,
            coinsMarketCaps[coinId],
            response.body.data[coinId].urls.website[0],
          ]);
        });
      }
    } catch (error) {
      console.error(
        `Problems while calling Coinmarketcap API coins details endpoint. Error: ${error}`
      );
      process.exit(1);
    }
  } catch (error) {
    console.error(
      "Problems while calling Coinmarketcap API coins listing endpoint. Error: " +
        error
    );
    process.exit(1);
  }

  for (coin of coinsArray) {
    try {
      let coinDomainName = "";
      if (coin[2]) {
        const coinDomainSplit1 = coin[2].split(/(https:\/\/|http:\/\/)+/);
        const coinDomainSplit2 =
          coinDomainSplit1[coinDomainSplit1.length - 1].split(/(\/)+/);
        coinDomainName = coinDomainSplit2[0].replace("www.", "");
      }

      fs.appendFileSync(DB_PATH + "/coinmarketcaps.txt", coinDomainName + "\n");
    } catch (err) {
      console.error(err);
    }
  }

  process.exit(0);
}