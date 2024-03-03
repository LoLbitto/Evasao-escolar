package com.evasaoescolar.logger;

import java.util.Date;
import java.util.logging.Formatter;
import java.util.logging.Level;
import java.util.logging.LogRecord;

public class LoggerFormatter extends Formatter {

    @Override
    public String format(LogRecord record) {
        String fileFormattedMessage = String.format(
                "Level: %s - Source: %s::%s \nTime: %s \nMessage: %s",
                record.getLevel(),
                record.getSourceClassName(),
                record.getSourceMethodName(),
                new Date(record.getMillis()),
                record.getThrown()
        );

        String consoleFormattedMessage = String.format(
                "Time: %s - Level: %s - Source: %s::%s \nThrown: %s",
                new Date(record.getMillis()),
                record.getLevel(),
                record.getSourceClassName(),
                record.getSourceMethodName(),
                record.getThrown()
        );

        if (record.getLevel() == Level.WARNING) {
            return fileFormattedMessage;
        }

        return consoleFormattedMessage;
    }
}
