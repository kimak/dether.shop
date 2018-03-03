# Dether.shop

## Table of Contents

* [Install](#install)
* [Docs](#docs)
* [Test](#test)
* [Build doc](#build-doc)
* [Dependencies](#dependencies)
* [Dev-Dependencies](#dev-dependencies)
* [Bugs](#bugs)
* [Donation](#donation)
* [TODO](#todo)

## Install

Use yarn to install dependencies:

```
git clone https://github.com/dethertech/dether.shop.git
cd dether.shop
yarn install
```

## Docs

Extensive documentation of all the methods can be found on the [API documentation](https://dethertech.github.io/dether.shop)

## Test
```
yarn test
```

## Build doc
```
yarn run esdoc
yarn run publish:esdoc
```

## Dependencies

* [dethercontract](https://github.com/dethertech/dethercontracts.git)

## Dev-Dependencies

* [dethercontract](https://github.com/dethertech/dethercontracts.git)


## Bugs

When you find issues, please report them:

* web: [https://github.com/dethertech/dether.shop/issues](https://github.com/dethertech/dether.shop/issues)


## Donation
* [Ethereum Foundation](https://ethereum.org/donate)
* [Etherscan](https://etherscan.io/address/0x71c7656ec7ab88b098defb751b7401b5f6d8976f)
* [MyEtherWallet](https://etherscan.io/address/0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8)
* [CoinMarketCap](https://etherscan.io/address/0x0074709077B8AE5a245E4ED161C971Dc4c3C8E2B)
* [Ethers.js](https://etherscan.io/address/0xEA517D5a070e6705Cc5467858681Ed953d285Eb9)

## TODO
* Add more tests

,
"husky": {
  "hooks": {
    "pre-commit": "yarn lint",
    "pre-push": "yarn lint && CI=true yarn test"
  }
}
