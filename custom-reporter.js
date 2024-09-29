class CustomReporter {
    onTestResult(test, testResult, aggregatedResult) {
      testResult.testResults.forEach(result => {
        if (result.status === 'failed') {
          result.failureMessages = result.failureMessages.map(message => {
            const lines = message.split('\n');
            return lines[0]; // Only return the first line of the error message
          });
        }
      });
    }
  }
  
  module.exports = CustomReporter;