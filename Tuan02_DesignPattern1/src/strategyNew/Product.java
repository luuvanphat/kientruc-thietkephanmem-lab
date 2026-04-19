package strategyNew;

public class Product {
    private double price;
    private TaxStrategy taxStrategy;

    public Product(double price, TaxStrategy taxStrategy) {
        this.price = price;
        this.taxStrategy = taxStrategy;
    }

    public double getFinalPrice() {
        return price + taxStrategy.calculate(price);
    }
}
