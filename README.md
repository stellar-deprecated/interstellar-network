`interstellar-network`
=============

The `interstellar-network` is part of the Interstellar Module System.

> Quick start to developing in the Interstellar eco-system:
>
> * Read [`Getting started`](https://github.com/stellar/interstellar/tree/master/docs) doc.
> * Install [`interstellar-workspace`](https://github.com/stellar/interstellar-workspace).
> * Read the technical overview of the system.
> * Contribute to our open-source modules or develop your own.

The `interstellar-network` module provides communication layer between Interstellar application and Stellar network.

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
* [`<interstellar-network-pre-send>`](#interstellar-network-pre-send-widget)
* [`<interstellar-network-send>`](#interstellar-network-send-widget)
* [`<interstellar-network-receive>`](#interstellar-network-receive-widget)
* [`<interstellar-network-balance>`](#interstellar-network-balance-widget)
* [`<interstellar-network-history>`](#interstellar-network-history-widget)

## `interstellar-network.Server` service

`interstellar-network.Server` is a js-stellar-lib [Server](http://stellar.github.io/js-stellar-lib/docs/Server.html) object created using application configuration. For more information please read js-stellar-lib documentation.

## `<interstellar-network-pre-send>` widget

TODO - screenshot

This widget displays send form.

## `<interstellar-network-send>` widget

TODO - screenshot

This widget displays send form.

## `<interstellar-network-receive>` widget

TODO - screenshot

This widget displays user's address.

## `<interstellar-network-balance>` widget

TODO - screenshot

This widget displays list of balances.

## `<interstellar-network-history>` widget

TODO - screenshot

This widget displays list of transactions.
