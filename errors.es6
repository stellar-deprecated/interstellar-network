export class MismatchedAddressError extends Error { }
export class SessionAlreadyDefinedError extends Error { }
export class SessionNotFoundError extends Error { }

export class TransactionFailedError extends Error {
  constructor(result) {
    super(`Transaction Failed: ${result.engine_result}`);
    this.result = result;
  }
}