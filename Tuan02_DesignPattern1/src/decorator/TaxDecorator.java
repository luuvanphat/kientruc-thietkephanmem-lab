package decorator;

abstract class TaxDecorator implements Tax {
    protected Tax tax;

    public TaxDecorator(Tax tax) {
        this.tax = tax;
    }

    @Override
    public double calculate(double price) {
        return tax.calculate(price); // Delegate
    }
}
