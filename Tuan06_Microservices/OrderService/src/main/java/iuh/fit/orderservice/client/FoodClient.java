package iuh.fit.orderservice.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class FoodClient {
    private final RestTemplate restTemplate = new RestTemplate();

    public Float getFoodPrice(String foodId) {
        try {
            String url = "http://localhost:8082/foods/" + foodId;
            return 50000f;
        } catch (Exception e) {
            return 0f;
        }
    }
}
