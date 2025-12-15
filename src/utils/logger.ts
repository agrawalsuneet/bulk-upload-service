type LogLevel = 'info' | 'warn' | 'error' | 'debug';

function log(level: LogLevel, message: string, meta?: unknown) {
  const logEntry: Record<string, unknown> = {
    level,
    message,
    timestamp: new Date().toISOString(),
  };

  if (meta !== undefined) {
    logEntry.meta = meta;
  }

  console.log(JSON.stringify(logEntry));
}

export const logger = {
  info(message: string, meta?: unknown) {
    log('info', message, meta);
  },

  warn(message: string, meta?: unknown) {
    log('warn', message, meta);
  },

  error(message: string, meta?: unknown) {
    log('error', message, meta);
  },

  debug(message: string, meta?: unknown) {
    log('debug', message, meta);
  },
};
