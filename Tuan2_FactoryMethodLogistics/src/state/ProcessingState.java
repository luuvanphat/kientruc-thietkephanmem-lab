package state;

class ProcessingState implements OrderState {
    @Override
    public void handle(Order order) {
        System.out.println("Đóng gói và vận chuyển...");
        order.setState(new DeliveredState());
    }
}
