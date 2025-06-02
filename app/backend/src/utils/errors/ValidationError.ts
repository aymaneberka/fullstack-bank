import CustomGenericError from './CustomGenericError';

class ValidationError extends CustomGenericError {
  constructor(message: string) {
    super(message, 400); // HTTP 400 Bad Request
  }
}

export default ValidationError;
