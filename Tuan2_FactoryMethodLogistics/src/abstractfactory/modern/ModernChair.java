package abstractfactory.modern;

import abstractfactory.product.Chair;

public class ModernChair implements Chair {

    public void sitOn() {
        System.out.println("Sit on Modern Chair");
    }

}