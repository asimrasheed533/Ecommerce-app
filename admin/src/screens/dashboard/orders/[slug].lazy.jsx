import { OrderProductsCard } from "components";
import OrderreturnDetails from "./../../../components/OrderreturnDetails";

export default function OrderDetails() {
  return (
    <div className="order__details">
      <div className="order__details__main">
        <div className="order__details__main__row">
          <OrderreturnDetails label="Payment Details" />
        </div>
        <div className="order__details__main__row">
          <OrderProductsCard label="Booking" />
        </div>
      </div>
    </div>
  );
}
