package state;
public class StateDemo {
    public static void main(String[] args) {
        Order order = new Order();

        order.setState(new NewState());
        order.process(); // New → Processing

        order.process(); // Processing → Delivered

        order.process(); // Delivered
    }
}
