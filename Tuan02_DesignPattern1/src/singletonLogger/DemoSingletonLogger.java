package singletonLogger;

public class DemoSingletonLogger {
    public static void main(String[] args) {
        Logger logger = Logger.getInstance();

        logger.log("Start app");
        logger.log("Error xảy ra");
    }
}
