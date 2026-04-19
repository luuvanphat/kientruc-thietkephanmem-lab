package singletonConfig;

import java.util.HashMap;
import java.util.Map;

public class ConfigManager {
    private static volatile ConfigManager instance;
    private Map<String, String> config = new HashMap<>();

    private ConfigManager() {
        config.put("API_KEY", "123456");
        config.put("DB_URL", "localhost");
    }

    public static ConfigManager getInstance() {
        if (instance == null) {
            synchronized (ConfigManager.class) {
                if (instance == null) {
                    instance = new ConfigManager();
                }
            }
        }
        return instance;
    }

    public String get(String key) {
        return config.get(key);
    }
}
