package decorator;

class VAT extends TaxDecorator {
    public VAT(Tax tax) {
        super(tax);
    }

    @Override
    public double calculate(double price) {
        double base = super.calculate(price);
        double vat = base * 0.10; // 10% VAT
        System.out.println("VAT: " + vat);
        return base + vat;
    }
}

class ConsumptionTax extends TaxDecorator {
    public ConsumptionTax(Tax tax) {
        super(tax);
    }

    @Override
    public double calculate(double price) {
        double base = super.calculate(price);
        double consTax = base * 0.05; // 5% thuế tiêu thụ
        System.out.println("Consumption Tax: " + consTax);
        return base + consTax;
    }
}

class LuxuryTax extends TaxDecorator {
    public LuxuryTax(Tax tax) {
        super(tax);
    }

    @Override
    public double calculate(double price) {
        double base = super.calculate(price);
        double luxTax = base * 0.20; // 20% luxury tax
        System.out.println("Luxury Tax: " + luxTax);
        return base + luxTax;
    }
}
