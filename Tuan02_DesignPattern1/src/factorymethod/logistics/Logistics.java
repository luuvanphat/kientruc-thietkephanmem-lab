package factorymethod.logistics;

import factorymethod.transport.Transport;

public abstract class Logistics {

    // Factory Method
    public abstract Transport createTransport();

    // Business logic
    public void planDelivery() {

        Transport transport = createTransport();

        transport.deliver();
    }

}
