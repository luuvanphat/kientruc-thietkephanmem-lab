package factorymethod.logistics;

import factorymethod.transport.Ship;
import factorymethod.transport.Transport;

public class SeaLogistics extends Logistics {

    @Override
    public Transport createTransport() {
        return new Ship();
    }

}
