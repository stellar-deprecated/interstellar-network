import {Inject} from 'interstellar-core';
import {contains, cloneDeep} from 'lodash';
import Promise from 'bluebird';

@Inject('interstellar-network.Server')
class AccountObservable {
  constructor(Server) {
    this.Server = Server;
    this.streamingAddresses = [];
    this.transactionListeners = {};
    this.balanceChangeListeners = {};
    this.balances = {};
    this.transactions = {};
  }

  _setupStreaming(address) {
    if (!contains(this.streamingAddresses, address)) {
      this.streamingAddresses.push(address);
      this.transactionListeners[address] = [];
      this.balanceChangeListeners[address] = [];

      this.Server.accounts(address, "transactions", {
        streaming: {
          onmessage: transaction => this._onTransaction.call(this, address, transaction)
        }
      });
    }
  }

  getTransactions(address) {
    return this.Server.accounts(address, "transactions")
      .then(transactions => {
        return cloneDeep(transactions);
      });
  }

  getBalances(address) {
    if (this.balances[address]) {
      return Promise.resolve(cloneDeep(this.balances[address]));
    } else {
      return this._getBalances(address)
        .then(balances => {
          this.balances[address] = balances;
          return cloneDeep(balances);
        });
    }
  }

  registerTransactionListener(address, listener) {
    this._setupStreaming(address);
    this.transactionListeners[address].push(listener);
  }

  registerBalanceChangeListener(address, listener) {
    this._setupStreaming(address);
    this.balanceChangeListeners[address].push(listener);
  }

  _getBalances(address) {
    return this.Server.accounts(address)
      .then(account => Promise.resolve(account.balances))
      .catch(e => {
        if (e.name === 'NotFoundError') {
          return [];
        } else {
          throw e;
        }
      });
  }

  _onTransaction(address, transaction) {
    if (this.transactionListeners[address]) {
      for (var listener of this.transactionListeners[address]) {
        listener(cloneDeep(transaction));
      }
    }

    if (this.balanceChangeListeners[address]) {
      this._getBalances(address)
        .then(balances => {
          this.balances[address] = balances;
          for (var listener of this.balanceChangeListeners[address]) {
            listener(cloneDeep(balances));
          }
        });
    }
  }
}

module.exports = function(mod) {
  mod.service("AccountObservable", AccountObservable);
};
