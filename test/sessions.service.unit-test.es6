import "../index";

describe("stellard.Sessions", function() {
  injectNg("stellard", {sessions: "stellard.Sessions"});

  it("is not null", function() {
    expect(this.sessions).to.be.an('object');
  });

  describe("#create", function() {

    it("adds a session with the name provided to the sessions collection");
    it("retrieves a network connection from the provided name");

    context("when no connection name is provided", function() {
      it("uses the live connection");
    });

    context("when a previous session has been created with the provided name", function() {
      it("raises a SessionAlreadyDefinedError");
      it("does not add to the sessions collection");
    });

    context("when provided secret and address do not match", function() {
      it("raises a MismatchedAddressError");
      it("does not add to the sessions collection");
    });
  });

  describe("#get", function() {
    context("when the requested session has been created", function() {
      it("returns the session");
    });

    context("when the requested session does not exist", function() {
      it("raises SessionNotFoundError");
    });
  });

  describe("#has", function() {
    context("when the requested session has been created", function() {
      it("returns true");
    });

    context("when the requested session does not exist", function() {
      it("returns false");
    });
  });

  describe("#destroy", function() {
    it("calls destroy on the underlying session object");
    it("removes the session object from the sessions collection");
  });

  describe("#createDefault", function() {
    it("calls create with the DEFAULT name");
  });

  describe("#default", function() {
    it("calls get with the DEFAULT name");
  });

  describe("#hasDefault", function() {
    it("calls has with the DEFAULT name");
  });
});

