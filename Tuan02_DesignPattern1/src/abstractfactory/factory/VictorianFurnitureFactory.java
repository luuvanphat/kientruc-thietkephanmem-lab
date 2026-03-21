package abstractfactory.factory;

import abstractfactory.product.Chair;
import abstractfactory.product.CoffeeTable;
import abstractfactory.product.Sofa;
import abstractfactory.victorian.VictorianChair;
import abstractfactory.victorian.VictorianCoffeeTable;
import abstractfactory.victorian.VictorianSofa;

public class VictorianFurnitureFactory implements FurnitureFactory {

    public Chair createChair() {
        return new VictorianChair();
    }

    public Sofa createSofa() {
        return new VictorianSofa();
    }

    public CoffeeTable createCoffeeTable() {
        return new VictorianCoffeeTable();
    }

}