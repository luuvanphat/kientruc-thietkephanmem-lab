package iuh.fit.orderservice.model;

import lombok.Data;
import java.util.List;

@Data
public class Order {
    private String id;
    private String userId;
    private List<String> foodIds;
    private Float total;
    private String status; // CREATED | PAID
}
