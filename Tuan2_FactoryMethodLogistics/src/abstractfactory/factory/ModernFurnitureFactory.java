package abstractfactory.factory;

import abstractfactory.modern.ModernChair;
import abstractfactory.modern.ModernCoffeeTable;
import abstractfactory.modern.ModernSofa;
import abstractfactory.product.Chair;
import abstractfactory.product.CoffeeTable;
import abstractfactory.product.Sofa;

public class ModernFurnitureFactory implements FurnitureFactory {

    public Chair createChair() {
        return new ModernChair();
    }

    public Sofa createSofa() {
        return new ModernSofa();
    }

    public CoffeeTable createCoffeeTable() {
        return new ModernCoffeeTable();
    }

}