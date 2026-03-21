package state;

class NewState implements OrderState {
    @Override
    public void handle(Order order) {
        System.out.println("Kiểm tra thông tin đơn hàng...");
        order.setState(new ProcessingState());
    }
}
