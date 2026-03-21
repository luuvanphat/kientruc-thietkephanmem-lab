package decorator;

class BaseProduct implements Tax {
    @Override
    public double calculate(double price) {
        return price; // Giá gốc
    }
}
