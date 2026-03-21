package strategy;

class FeeDecorator extends PaymentDecorator {
    private double fee;

    public FeeDecorator(PaymentStrategy payment, double fee) {
        super(payment);
        this.fee = fee;
    }

    @Override
    public void pay(double amount) {
        double total = amount + fee;
        System.out.println("Thêm phí xử lý: " + fee);
        super.pay(total);
    }
}

class DiscountDecorator extends PaymentDecorator {
    private double discount;

    public DiscountDecorator(PaymentStrategy payment, double discount) {
        super(payment);
        this.discount = discount;
    }

    @Override
    public void pay(double amount) {
        double total = amount - discount;
        System.out.println("Áp dụng giảm giá: " + discount);
        super.pay(total);
    }
}
