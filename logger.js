class Logger {
    log(message) {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] ${message}`);
    }
  }
  
  export default new Logger();
  