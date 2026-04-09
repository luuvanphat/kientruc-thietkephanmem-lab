package iuh.fit.orderservice.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class UserClient {
    private final RestTemplate restTemplate = new RestTemplate();

    public boolean validateUser(String userId) {
        try {
            String url = "http://localhost:8081/users/" + userId;
            Object user = restTemplate.getForObject(url, Object.class);
            return user != null;
        } catch (Exception e) {
            return false;
        }
    }
}
