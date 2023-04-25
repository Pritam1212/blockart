const { Item, Image, Button } = require("semantic-ui-react");
import web3 from "@/ethereum/web3";
import { useRouter } from "next/router";
import styles from "../styles/buyer-orders.module.css";
import Escrow from "@/ethereum/escrow";
import { useContext, useState } from "react";
import appContext from "@/context/appContext";

const BuyerOrder = ({ order, product }) => {
  // console.log(order, product);
  const context = useContext(appContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  let status;
  // let img =
  //   "https://ipfs.io/ipfs/QmX3abi8WCv3zAHXsCzhvCJ8RX5Zv8if3ZeFK3B5J3WLkb?filename=Zephyrus%20GX550_1920x1080.jpg";
  switch (product[6]) {
    case "0":
      status = "Available";
      break;
    case "1":
      status = "Processing";
      break;
    case "2":
      status = "Shipping";
      break;
    case "3":
      status = "Sold & Delivered";
      break;

    default:
      break;
  }

  const acceptHandler = async () => {
    setIsLoading(true);
    const escrow = Escrow(order.escrow);

    await escrow.methods.accept().send({
      from: context.wallet,
    });
    setIsLoading(false);
    router.replace(`/${context.wallet}/buyer-orders`);
  };

  const rejectHandler = async () => {
    setIsLoading(true);
    const escrow = Escrow(order.escrow);

    await escrow.methods.reject().send({
      from: context.wallet,
    });
    setIsLoading(false);
    router.replace(`/${context.wallet}/buyer-orders`);
  };

  return (
    <Item style={{ textTransform: "capitalize" }}>
      {/* <Item.Image
        style={{ cursor: "pointer" }}
        onClick={() => router.push(`/${order.productId}/view-product`)}
        size="medium"
        src={product[2]}
      /> */}
      <Image
        style={{
          height: "200px",
          width: "200px",
          objectFit: "cover",
          cursor: "pointer",
        }}
        centered
        src={product[2]}
        onClick={() => router.push(`/${order.productId}/view-product`)}
      />

      <Item.Content>
        <Item.Header as="a">{product[0]}</Item.Header>
        <Item.Meta>{product[1]}</Item.Meta>
        <Item.Extra>
          Price: <b>{web3.utils.fromWei(product[5], "ether")}</b>ETH
        </Item.Extra>
        <Item.Extra>
          Status:{" "}
          {status === "Available" ? (
            <b style={{ color: "red" }}>Order was Cancelled!</b>
          ) : (
            status
          )}
        </Item.Extra>
        <Item.Description>
          Seller: <b>{order.seller}</b>
        </Item.Description>
        <Item.Description>
          Escrow Contract: <b>{order.escrow}</b>
        </Item.Description>
      </Item.Content>
      {status === "Shipping" ? (
        <div className={styles.approveButton}>
          <Button
            loading={isLoading}
            onClick={acceptHandler}
            inverted
            color="green"
          >
            Delivery Success
          </Button>
          <Button
            loading={isLoading}
            onClick={rejectHandler}
            inverted
            color="red"
          >
            Cancel
          </Button>
        </div>
      ) : null}
    </Item>
  );
};

export default BuyerOrder;
