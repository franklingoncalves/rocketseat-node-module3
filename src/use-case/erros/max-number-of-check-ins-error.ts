export class MaxNumberOfcheckInsError extends Error {
  constructor() {
    super("Max number of check-ins reached.");
  }
}
