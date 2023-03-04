import { Button, Item } from "semantic-ui-react";
import styles from "../styles/cart.module.css";
import store from "../ethereum/store";
import { useEffect, useState } from "react";
import web3 from "@/ethereum/web3";
import { useRouter } from "next/router";

const cartProduct = ({ id }) => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function getProduct() {
      let data = await store.methods.getProduct(id).call();
      setProduct(data);
      //   console.log(product);
    }
    getProduct();
  }, []);

  let img =
    "https://ipfs.io/ipfs/QmX3abi8WCv3zAHXsCzhvCJ8RX5Zv8if3ZeFK3B5J3WLkb?filename=Zephyrus%20GX550_1920x1080.jpg";

  //   const removeCart = async () => {
  //     try {
  //       const res = await fetch(`/api/users/${context.userId}`, {
  //         method: "PUT",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           $pull: {
  //             cart: `${id}`,
  //           },
  //         }),
  //       });
  //       // setCartAdded(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <Item style={{ textTransform: "capitalize" }}>
      <Item.Image
        style={{ cursor: "pointer" }}
        //   onClick={() => router.push(`/${order.productId}/view-product`)}
        size="medium"
        src={img}
      />

      <Item.Content>
        <Item.Header as="a">{product[0]}</Item.Header>
        <Item.Meta>{product[1]}</Item.Meta>
        {/* <Item.Extra>
          Price: <b>{web3.utils.fromWei(product[5], "ether")}</b>ETH
        </Item.Extra> */}
        {/* <Item.Extra>
            Status:
            {status === "Available" ? (
              <b style={{ color: "red" }}>Order was Cancelled!</b>
            ) : (
              status
            )}
          </Item.Extra> */}
        <Item.Description>
          Seller: <b>{product[4]}</b>
        </Item.Description>
      </Item.Content>
      <div className={styles.approveButton}>
        <Button
          loading={isLoading}
          onClick={() => router.push(`/${id}/view-product`)}
          inverted
          color="green"
        >
          Buy Now!
        </Button>
        {/* <Button loading={isLoading} onClick={removeCart} inverted color="red">
          Remove from Cart
        </Button> */}
      </div>
    </Item>
  );
};

export default cartProduct;
