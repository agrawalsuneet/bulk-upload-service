function log(level, message, meta) {
    const logEntry = {
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
    info(message, meta) {
        log('info', message, meta);
    },
    warn(message, meta) {
        log('warn', message, meta);
    },
    error(message, meta) {
        log('error', message, meta);
    },
    debug(message, meta) {
        log('debug', message, meta);
    },
};
//# sourceMappingURL=logger.js.map