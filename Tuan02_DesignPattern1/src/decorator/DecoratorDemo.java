package decorator;

public class DecoratorDemo {
    public static void main(String[] args) {
        double basePrice = 1000;

        // Tạo sản phẩm cơ bản
        Tax product = new BaseProduct();

        // Áp dụng nhiều loại thuế chồng lên nhau
        product = new VAT(product);
        product = new ConsumptionTax(product);
        product = new LuxuryTax(product);

        double finalPrice = product.calculate(basePrice);
        System.out.println("Final price: " + finalPrice);
    }
}
