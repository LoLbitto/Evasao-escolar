package com.evasaoescolar.logger;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.logging.ConsoleHandler;
import java.util.logging.FileHandler;
import java.util.logging.Logger;

public class JavaLogger {

    private static final String[] POSSIBLE_DIRECTORIES = new String[]{"site", "configurator", "logger"};
    private static final String WORKING_DIRECTORY = System.getProperty("user.dir");
    private static final String LOG_DIRECTORY;

    static {
        if (Arrays.stream(POSSIBLE_DIRECTORIES).anyMatch(WORKING_DIRECTORY::contains)) {
            LOG_DIRECTORY = "../" + WORKING_DIRECTORY + "/log/";
        } else {
            LOG_DIRECTORY = WORKING_DIRECTORY + "/log/";
        }
    }

    public static Logger getJavaLogger(String name) {
        Logger logger = Logger.getLogger(name);
        ConsoleHandler consoleHandler = new ConsoleHandler();
        consoleHandler.setFormatter(new LoggerFormatter());
        consoleHandler.setFilter(new LoggerFilter());
        logger.addHandler(consoleHandler);
        FileHandler fileHandler;

        try {
            File logDirectory = new File(LOG_DIRECTORY);
            logger.fine(String.valueOf(logDirectory.mkdir()));

            fileHandler = new FileHandler(LOG_DIRECTORY + name + ".txt");
        } catch (IOException e) {
            logger.warning(e.getMessage());
            return logger;
        }

        fileHandler.setFormatter(new LoggerFormatter());
        fileHandler.setFilter(new LoggerFilter());
        logger.addHandler(fileHandler);

        return logger;
    }

}
