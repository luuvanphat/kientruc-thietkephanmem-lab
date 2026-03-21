package strategy;

public class PaymentDemo {
    public static void main(String[] args) {
        double amount = 1000;

        // Chọn phương thức thanh toán: Credit Card
        PaymentStrategy payment = new CreditCardPayment();

        // Thêm tính năng: phí xử lý + giảm giá
        payment = new FeeDecorator(payment, 50);
        payment = new DiscountDecorator(payment, 100);

        payment.pay(amount);

        System.out.println("------");

        // Chọn phương thức thanh toán khác: PayPal
        PaymentStrategy paypal = new PayPalPayment();
        paypal = new DiscountDecorator(paypal, 50);
        paypal.pay(amount);
    }
}
