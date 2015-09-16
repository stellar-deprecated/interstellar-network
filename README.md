`interstellar-network`
=============

The `interstellar-network` module is part of the [Interstellar Module System](https://github.com/stellar/interstellar).

It provides a communication layer between Interstellar applications and the Stellar network.

> Quick start to developing in the Interstellar eco-system:
>
> * Read [`Getting started`](https://github.com/stellar/interstellar/tree/master/docs) doc.
> * Install [`interstellar-workspace`](https://github.com/stellar/interstellar-workspace).
> * Contribute to our [open-source modules](https://github.com/stellar/interstellar/blob/master/docs/module-list.md) or develop your own.

## Default configuration

```json
{
  "networkPassphrase": "Test SDF Network ; September 2015",
  "horizon": {
    "secure": true,
    "hostname": "horizon-testnet.stellar.org",
    "port": 443
  }
}
```

`interstellar-network` module exports two `const`s:
* `NETWORK_PUBLIC` - containing Public Global Stellar Network passphrase,
* `NETWORK_TESTNET` - containing Test SDF Network passphrase

Read more about [modules configuration](https://github.com/stellar/interstellar-core#interstellar-coreconfig-service).

## Module contents

#### Classes
None

#### Services
* [`interstellar-network.AccountObservable`](#interstellar-networkaccountobservable-service)
* [`interstellar-network.Server`](#interstellar-networkserver-service)

#### Widgets
None

## `interstellar-network.AccountObservable` service

`interstellar-network.AccountObservable` provides a shared space for accounts state and events. Let's say there are 2 widgets displaying a current balance. Without `interstellar-network.AccountObservable` each of them would have to make it's own requests to [horizon](https://github.com/stellar/go-horizon) server in order to get balance data. This service saves a recently fetched account information in the internal cache so every widget can get the latest information about the account without having to make requests to [horizon](https://github.com/stellar/go-horizon).

#### `getBalances(address)` method

Returns the cached balance data for `address`. If there is no cache data will be requested from [horizon](https://github.com/stellar/go-horizon) and then returned.

```js
AccountObservable.getBalances(address)
  .then(balances => {
    console.log(balances);
  });
```

Returns a `Promise`.

#### `getTransactions(address)` method

Returns the transactions list for `address`. This data will not be cached so it will be requested from [horizon](https://github.com/stellar/go-horizon) every time it's used.

```js
AccountObservable.getTransactions(address)
  .then(transactions => {
    console.log(transactions);
  });
```

Returns a `Promise`.

#### `registerBalanceChangeListener(address, callback)` method

Registers listener for balance changes. `callback` function will be called every time there is a change in one or more user balances.

```js
AccountObservable.registerBalanceChangeListener(address, balances => {
  console.log(balances);
});
```

#### `registerTransactionListener(address, callback)` method

Registers listener for new transactions. `callback` function will be called every time there is a new transaction in `address`.

```js
AccountObservable.registerTransactionListener(address, transaction => {
  console.log(transaction);
});
```

## `interstellar-network.Server` service

`interstellar-network.Server` is a stellar-sdk [Server](http://stellar.github.io/stellar-sdk/docs/Server.html) object created using application configuration. For more information please read stellar-sdk documentation.

## Publishing to npm
```
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease]
npm publish
```
npm >=2.13.0 required.
Read more about [npm version](https://docs.npmjs.com/cli/version).
