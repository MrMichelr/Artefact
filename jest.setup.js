const chalk = require('chalk');

expect.extend({
  toMatchTokens(received, expected) {
    try {
      expect(received).toMatchObject(expected);
      return { pass: true };
    } catch (error) {
      return {
        pass: false,
        message: () => error.message,
      };
    }
  },
});

// Custom error formatter
Error.prepareStackTrace = (error, stack) => {
  if (error.name === 'TokenMismatchError') {
    return error.message;
  }
  return `${error}\n${stack.map(frame => `    at ${frame}`).join('\n')}`;
};