package abstractfactory.modern;

import abstractfactory.product.CoffeeTable;

public class ModernCoffeeTable implements CoffeeTable {
    public void use() {
        System.out.println("Use Modern Coffee");
    }
}
