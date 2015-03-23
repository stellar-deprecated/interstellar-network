import { Session } from "../lib/session";
import { NetworkConnection } from "../lib/network-connection";
import { AddressSecretPair } from "../lib/address-secret-pair";
import { Transaction } from "stellar-lib";

describe.only("Session", function() {
  dontUseAngularQ();
  setupMockSocket("online");

  injectNg("stellard", {
    network: "stellard.Network", 
    config: "core.Config",
    q: "$q",
  });

  lazy("addressPair", function(){ 
    return new AddressSecretPair(); 
  });

  lazy("connectionSpec", function() {
    return this.config.get("stellard/connections/live");
  });

  lazy("connection", function(){ 
    return new NetworkConnection(this.q, this.network, "live", this.connectionSpec);
  });

  lazy("session", function(){ 
    return new Session(this.addressPair.address, this.addressPair.secret, this.connection); 
  });
  
  describe("#constructor", function() {
    // simple test to ensure the constructor doesn't raise
    it("returns a new Session object", function() {
      expect(this.session).to.be.instanceof(Session);
    }); 
  });

  describe("#withSecret", function() {
    it("returns a new Session object with the provided key");
    it("raises MismatchedSecretError when the provided secret isn't matched with the sessions current address");
  });

  describe("#destroy", function() {
    it("doesn't raise an exception");
  });

  describe("#ensureConnected", function() {
    itDelegatesToConnection("ensureConnected");
  });

  describe("#sendRequest", function() {
    itDelegatesToConnection("sendRequest", "account_info");
  });

  describe("#sendTransaction", function() {
    itDelegatesToConnection("sendTransaction", new Transaction({}));
  });

  function itDelegatesToConnection(fnName, ...args) {
    it("delegates to the underlying connection", function() {
      this.sinon.spy(this.connection, fnName);
      this.session[fnName].apply(this.session, args);

      expect(this.connection[fnName]).to.have.been.calledOnce;
    });
  }
});



