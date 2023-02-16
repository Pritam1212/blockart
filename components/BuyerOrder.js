const { Item, Image, Button } = require("semantic-ui-react");
import web3 from "@/ethereum/web3";
import { useRouter } from "next/router";
import styles from "../styles/buyer-orders.module.css";

const BuyerOrder = ({ order, product }) => {
  console.log(order, product);
  const router = useRouter();
  let status;
  let img =
    "https://ipfs.io/ipfs/QmX3abi8WCv3zAHXsCzhvCJ8RX5Zv8if3ZeFK3B5J3WLkb?filename=Zephyrus%20GX550_1920x1080.jpg";
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
  return (
    <Item style={{ textTransform: "capitalize" }}>
      <Item.Image
        style={{ cursor: "pointer" }}
        onClick={() => router.push(`/${order.productId}/view-product`)}
        size="medium"
        src={img}
      />

      <Item.Content>
        <Item.Header as="a">{product[0]}</Item.Header>
        <Item.Meta>{product[1]}</Item.Meta>
        <Item.Extra>
          Price: <b>{web3.utils.fromWei(product[5], "ether")}</b>ETH
        </Item.Extra>
        <Item.Extra>Status: {status}</Item.Extra>
        <Item.Description>
          Seller: <b>{order.seller}</b>
        </Item.Description>
      </Item.Content>
      {status === "Shipping" ? (
        <div className={styles.approveButton}>
          <Button inverted color="green">
            Delivery Success
          </Button>
          <Button inverted color="red">
            Cancel
          </Button>
        </div>
      ) : null}
    </Item>
  );
};

export default BuyerOrder;
