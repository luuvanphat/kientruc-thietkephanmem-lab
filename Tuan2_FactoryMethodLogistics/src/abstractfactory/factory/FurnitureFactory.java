package abstractfactory.factory;

import abstractfactory.product.Chair;
import abstractfactory.product.CoffeeTable;
import abstractfactory.product.Sofa;

public interface FurnitureFactory {

    Chair createChair();

    Sofa createSofa();

    CoffeeTable createCoffeeTable();

}