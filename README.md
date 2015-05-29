`mcs-network`
=============

The `mcs-network` is part of the Modular Client System.

> Quick start to developing in the MCS eco-system:
>
> * Install [`mcs-workspace`](https://github.com/stellar/mcs-workspace).
> * Read the technical overview of the system.
> * Contribute to our open-source modules or develop your own.

The `mcs-network` module provides communication layer between MCS application and Stellar network.

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

Read more about [modules configuration](https://github.com/stellar/mcs-core#mcs-coreconfig-service).

## Module contents

#### Classes
None

#### Services
* [`mcs-network.Server`](#mcs-networkserver-service)

#### Widgets
* [`<mcs-network-pre-send>`](#mcs-network-pre-send-widget)
* [`<mcs-network-send>`](#mcs-network-send-widget)
* [`<mcs-network-receive>`](#mcs-network-receive-widget)
* [`<mcs-network-balance>`](#mcs-network-balance-widget)
* [`<mcs-network-history>`](#mcs-network-history-widget)

## `mcs-network.Server` service

`mcs-network.Server` is a js-stellar-lib [Server](http://stellar.github.io/js-stellar-lib/docs/Server.html) object created using application configuration. For more information please read js-stellar-lib documentation.

## `<mcs-network-pre-send>` widget

TODO - screenshot

This widget displays send form.

## `<mcs-network-send>` widget

TODO - screenshot

This widget displays send form.

## `<mcs-network-receive>` widget

TODO - screenshot

This widget displays user's address.

## `<mcs-network-balance>` widget

TODO - screenshot

This widget displays list of balances.

## `<mcs-network-history>` widget

TODO - screenshot

This widget displays list of transactions.