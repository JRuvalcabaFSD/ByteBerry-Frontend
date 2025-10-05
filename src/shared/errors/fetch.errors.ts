/**
 * Custom error class for handling HTTP fetch request failures.
 *
 * Extends the native Error class to provide additional context about failed HTTP requests,
 * including the HTTP status code and the URL that was being requested.
 *
 * @example
 * ```typescript
 * throw new FetchError('Request failed', 404, 'https://api.example.com/users');
 * ```
 *
 * @param message - The error message describing what went wrong
 * @param statusCode - The HTTP status code returned by the server (optional)
 * @param url - The URL that was being requested when the error occurred (optional)
 */

export class FetchError extends Error {
  /**
   * Creates an instance of FetchError.
   * @param {string} message
   * @param {number} [statusCode]
   * @param {string} [url]
   * @memberof FetchError
   */

  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly url?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, FetchError.prototype);
  }
}
