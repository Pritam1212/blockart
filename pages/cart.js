const { default: Layout } = require("@/components/Layout");
const { Item, Divider } = require("semantic-ui-react");
import appContext from "@/context/appContext";
import { useContext } from "react";
import styles from "../styles/cart.module.css";
const { default: CartProduct } = require("@/components/CartProduct");

const Cart = () => {
  const context = useContext(appContext);
  let products = context.cart;
  let i = 0;
  return (
    <>
      <Layout />
      <div className={styles.container}>
        <Item.Group>
          <h2>Your Cart</h2>
          <Divider />
          <br />
          {products.map((id) => {
            return (
              <>
                <CartProduct id={products[i++]} />
                <br />
              </>
            );
          })}
        </Item.Group>
      </div>
    </>
  );
};

export default Cart;
