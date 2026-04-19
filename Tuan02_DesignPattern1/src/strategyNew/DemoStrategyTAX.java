package strategyNew;

public class DemoStrategyTAX {
    public static void main(String[] args) {
        Product normal = new Product(100, new VATTax());
        Product luxury = new Product(100, new LuxuryTax());

        System.out.println("Normal: " + normal.getFinalPrice());
        System.out.println("Luxury: " + luxury.getFinalPrice());
    }
}
