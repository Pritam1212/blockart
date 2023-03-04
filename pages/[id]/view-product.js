import Layout from "@/components/Layout";
import appContext from "@/context/appContext";
import web3 from "@/ethereum/web3";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Button, Divider, Header, Icon, Image, Popup } from "semantic-ui-react";
import store from "../../ethereum/store";
import styles from "../../styles/view-product.module.css";

const viewProduct = ({ product }) => {
  // console.log(product['id']);
  // const [cartAdded, setCartAdded] = useState(false);
  const context = useContext(appContext);
  const router = useRouter();

  const addToCart = async () => {
    try {
      const res = await fetch(`/api/users/${context.userId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          $addToSet: {
            cart: `${product["id"]}`,
          },
        }),
      });
      // setCartAdded(true);
    } catch (error) {
      console.log(error);
    }
  };
  const removeCart = async () => {
    try {
      const res = await fetch(`/api/users/${context.userId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          $pull: {
            cart: `${product["id"]}`,
          },
        }),
      });
      // setCartAdded(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    context.fetchCart();
  }, [addToCart, removeCart]);
  let status;

  switch (product[6]) {
    case "0":
      status = "Available";
      break;
    case "1":
      status = "Sold Out";
      break;
    case "2":
      status = "Sold Out";
      break;
    case "3":
      status = "Sold Out";
      break;

    default:
      break;
  }
  return (
    <>
      <Layout />
      <div className={styles.container}>
        <Image
          style={{
            borderRadius: "5px",
            boxShadow: "12px 2px 57px -5px rgba(0,0,0,0.36)",
          }}
          size="large"
          src="https://ipfs.io/ipfs/QmX3abi8WCv3zAHXsCzhvCJ8RX5Zv8if3ZeFK3B5J3WLkb?filename=Zephyrus%20GX550_1920x1080.jpg"
        />
        <div className={styles.info}>
          <h1>{product[0]}</h1>
          <h4>Category: {product[1]}</h4>
          <h3>{product[3]}</h3>
          <Divider horizontal>
            <Header as="h5">
              <Icon name="tag" size="tiny" />
              Price
            </Header>
          </Divider>
          <h3>{web3.utils.fromWei(product[5], "ether")} ETH</h3>
          <Divider horizontal>
            <Header as="h5">
              <Icon name="user" size="tiny" />
              Seller
            </Header>
          </Divider>
          <h3>
            {product[4]}
            <Popup
              content="Copy to Clipboard!"
              trigger={
                <Button
                  style={{ boxShadow: "none !important" }}
                  inverted
                  color="brown"
                  circular
                  icon="copy outline"
                  onClick={() => navigator.clipboard.writeText(product[4])}
                />
              }
            />
          </h3>
          {status === "Available" ? (
            <div className={styles.approveButton}>
              <Button
                onClick={() =>
                  router.push(`/${product["id"]}/${context.userId}/checkout`)
                }
                inverted
                color="green"
              >
                <Icon name="cart arrow down" />
                Buy Now!
              </Button>
              {context.cart.includes(product["id"]) ? (
                <Button onClick={removeCart} inverted color="red">
                  <Icon name="minus" />
                  Remove from cart
                </Button>
              ) : (
                <Button onClick={addToCart} inverted color="red">
                  <Icon name="plus" />
                  Add to Cart!
                </Button>
              )}
            </div>
          ) : (
            <div className={styles.approveButton}>
              <Button disabled inverted color="green">
                <Icon name="cart arrow down" />
                Sold!
              </Button>
              {context.cart.includes(product["id"]) ? (
                <Button onClick={removeCart} inverted color="red">
                  <Icon name="minus" />
                  Remove from cart
                </Button>
              ) : (
                <Button onClick={addToCart} inverted color="red">
                  <Icon name="plus" />
                  Add to Cart!
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

viewProduct.getInitialProps = async ({ query: { id } }) => {
  let data = await store.methods.getProduct(id).call();
  data = { ...data, id };
  return { product: data };
};

export default viewProduct;
