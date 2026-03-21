package strategy;

abstract class PaymentDecorator implements PaymentStrategy {
    protected PaymentStrategy wrappedPayment;

    public PaymentDecorator(PaymentStrategy payment) {
        this.wrappedPayment = payment;
    }

    @Override
    public void pay(double amount) {
        wrappedPayment.pay(amount); // delegate
    }
}
