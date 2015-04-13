# `stellard` Module

The `stellard` module provides the lower level mechanisms to communicate with the stellar network.

This module is intended to be a cover over `stellar-lib`, integrating well with an modular client environment.

This is meant primarily for backend code; `services` and `lib` scripts.

## Notable Services

The two major services provided by this module are [stellard.Network](services/network.service.es6) and [stellard.Sessions](services/sessions.service.ed6).

### stellard.Network

The Network service manages low level connections (i.e. stellar-lib Remote objects) and wraps them in a Promise-based interface.  Additionally, this service will broadcast events on the root scope that other components can use to get notifications regarding network state.


#### Example Usage

```javascript

//Load someone's balance

let network = $get('stellard.Network');
// connect to the live stellar network
network.get("live")
  // wait until we are connected
  .ensureConnected()
  // issue a request
  .then(nc => nc.sendRequest("account_info", {account: "gM4Fpv2QuHY4knJsQyYGKEHFGw3eMBwc1U"}))
  // process results
  .then(result => {
    console.log(result.account_data.Balance);
  });

```

### stellard.Sessions

The Network service has no concept of a user.  NetworkConnection objects do not have an associated address or secret.  The Sessions service is where we introduce addresses and secrets.

A session object (obtained through either `Sessions.get` or `Sessions.default`) present a similar interface to a `NetworkConnection` object.  The difference is that for helper methods, it will inject the sessions address/secret automatically on the higher level operations.

In addition, a session object has a `withSecret` method that allows you to upgrade to a new session that can, for example, sign requests as needed.

#### Example Usage

```javascript

// watch an account on both live and testnet
let sessions = $get('stellard.Sessions');
let live     = sessions.create("account_live", { address: "gM4Fpv2QuHY4knJsQyYGKEHFGw3eMBwc1U", connection: 'live' });
let test     = sessions.create("account_test", { address: "gM4Fpv2QuHY4knJsQyYGKEHFGw3eMBwc1U", connection: 'test' });

live.listenForPayments();
test.listenForPayments();

```

### TODO

- [ ] Encrypt wallet secret with user password before saving it in cookie.