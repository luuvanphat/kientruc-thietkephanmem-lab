import abstractfactory.factory.FurnitureFactory;
import abstractfactory.factory.ModernFurnitureFactory;
import abstractfactory.product.Chair;
import abstractfactory.product.CoffeeTable;
import abstractfactory.product.Sofa;

public class Main {

    public static void main(String[] args) {

//        Logistics logistics;
//
//        logistics = new RoadLogistics();
//        logistics.planDelivery();
//
//        logistics = new SeaLogistics();
//        logistics.planDelivery();

        FurnitureFactory factory;

        factory = new ModernFurnitureFactory();

        Chair chair = factory.createChair();
        Sofa sofa = factory.createSofa();
        CoffeeTable coffeeTable = factory.createCoffeeTable();

        chair.sitOn();
        sofa.lieOn();
        coffeeTable.use();
    }
}