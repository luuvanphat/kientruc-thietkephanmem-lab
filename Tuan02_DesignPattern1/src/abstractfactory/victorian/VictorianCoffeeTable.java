package abstractfactory.victorian;

import abstractfactory.product.CoffeeTable;

public class VictorianCoffeeTable implements CoffeeTable {

    public void use() {
        System.out.println("Use Victorian Coffee");
    }

}
