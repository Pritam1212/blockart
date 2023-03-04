const { default: Layout } = require("@/components/Layout");
import BuyerOrder from "@/components/BuyerOrder";
import { Divider, Item } from "semantic-ui-react";
import store from "../../ethereum/store";
import styles from "../../styles/buyer-orders.module.css";

const buyerOrders = ({ props }) => {
  console.log(props);
  let orders = props.orders;
  let products = props.products;
  let i = 0;
  return (
    <>
      <Layout />
      <div className={styles.container}>
        <Item.Group>
          <h2>Your Orders</h2>
          <Divider />
          <br />
          {orders.map((order) => {
            return (
              <>
                <BuyerOrder order={order} product={products[i++]} />
                <br />
              </>
            );
          })}
        </Item.Group>
      </div>
    </>
  );
};

buyerOrders.getInitialProps = async ({ query }) => {
  //   console.log(query.id);
  //   console.log(typeof id);
  let orders = [];
  let products = [];
  await store.getPastEvents(
    "OrderCreated",
    {
      filter: { buyer: query.id },
      fromBlock: 0,
      toBlock: "latest",
    },
    (error, events) => {
      if (!error) {
        const obj = JSON.parse(JSON.stringify(events));
        const array = Object.keys(obj);
        for (let index = 0; index < array.length; index++) {
          const order = obj[array[index]].returnValues;
          orders.push(order);
        }
        // console.log(orders);
      } else {
        console.log(error);
      }
    }
  );
  async function productInfo() {
    for await (const order of orders) {
      const product = await store.methods.getProduct(order.productId).call();
      products.push(product);
    }
  }
  await productInfo();
  // console.log(products);
  return { props: { orders, products } };
};

export default buyerOrders;
