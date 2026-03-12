package factorymethod.logistics;

import factorymethod.transport.Transport;
import factorymethod.transport.Truck;

public class RoadLogistics extends Logistics {

    @Override
    public Transport createTransport() {
        return new Truck();
    }

}
