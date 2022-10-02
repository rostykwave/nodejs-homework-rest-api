class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
    this.message = `Not found`;
  }
}
class MissingFieldsError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = {
  ValidationError,
  NotFoundError,
  MissingFieldsError,
};