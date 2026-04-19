package singletonConfig;

public class DemoSingletonConfig {
    public static void main(String[] args) {
        ConfigManager config = ConfigManager.getInstance();

        System.out.println(config.get("API_KEY"));
        System.out.println(config.get("DB_URL"));
    }
}
