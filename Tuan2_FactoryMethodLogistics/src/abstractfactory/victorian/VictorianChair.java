package abstractfactory.victorian;

import abstractfactory.product.Chair;

public class VictorianChair implements Chair {

    public void sitOn() {
        System.out.println("Sit on Victorian Chair");
    }

}