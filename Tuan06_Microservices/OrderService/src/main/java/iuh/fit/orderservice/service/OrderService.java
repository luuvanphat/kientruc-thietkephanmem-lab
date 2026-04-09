package iuh.fit.orderservice.service;

import iuh.fit.orderservice.client.FoodClient;
import iuh.fit.orderservice.client.UserClient;
import iuh.fit.orderservice.model.Order;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    private final UserClient userClient;
    private final FoodClient foodClient;
    private final List<Order> orders = new ArrayList<>();

    public OrderService(UserClient userClient, FoodClient foodClient) {
        this.userClient = userClient;
        this.foodClient = foodClient;
    }

    public Order createOrder(Order request) {
//        if (!userClient.validateUser(request.getUserId())) {
//            throw new RuntimeException("Invalid User!");
//        }

        float total = 0f;
        if (request.getFoodIds() != null) {
            for (String foodId : request.getFoodIds()) {
                total += foodClient.getFoodPrice(foodId);
            }
        }

        request.setId(UUID.randomUUID().toString());
        request.setTotal(total);
        request.setStatus("CREATED");
        orders.add(request);

        return request;
    }

    public List<Order> getAllOrders() {
        return orders;
    }
    public Order updateOrderStatus(String orderId, String status) {
        for (Order order : orders) {
            if (order.getId().equals(orderId)) {
                order.setStatus(status);
                return order;
            }
        }
        throw new RuntimeException("Không tìm thấy đơn hàng!");
    }
}
