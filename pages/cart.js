const { default: Layout } = require("@/components/Layout");
const { Item, Divider } = require("semantic-ui-react");
import appContext from "@/context/appContext";
import Link from "next/link";
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
      {context.isLogged ? (
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
      ) : (
        <div className={styles.formContainer}>
          <h3>Please Connect your Wallet!</h3>
          <h4>
            Go back to <Link href="/home">home</Link>
          </h4>
        </div>
      )}
    </>
  );
};

export default Cart;
