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
  "horizon": {
    "secure": true,
    "hostname": "horizon-testnet.stellar.org",
    "port": 443
  }
}
```

Read more about [modules configuration](https://github.com/stellar/interstellar-core#interstellar-coreconfig-service).

## Module contents

#### Classes
None

#### Services
* [`interstellar-network.Server`](#interstellar-networkserver-service)

#### Widgets
None

## `interstellar-network.Server` service

`interstellar-network.Server` is a js-stellar-lib [Server](http://stellar.github.io/js-stellar-lib/docs/Server.html) object created using application configuration. For more information please read js-stellar-lib documentation.
