import web3 from "@/ethereum/web3";
import styles from "../styles/seller-products.module.css";
import { Button, Item } from "semantic-ui-react";

const SellerProduct = ({ product }) => {
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
    <Item>
      <Item.Image size="medium" src={img} />

      <Item.Content>
        <Item.Header as="a">{product[0]}</Item.Header>
        <Item.Meta>{product[1]}</Item.Meta>
        <Item.Description>{product[3]}</Item.Description>
        <Item.Extra>
          Price: <b>{web3.utils.fromWei(product[5], "ether")}</b>ETH
        </Item.Extra>
        <Item.Extra>Status: {status}</Item.Extra>
        {status === "Processing" ? (
          <Item.Description>
            Buyer: <b>address</b>
          </Item.Description>
        ) : null}
      </Item.Content>
      {status === "Processing" ? (
        <div className={styles.approveButton}>
          <Button inverted color="green">
            Approve for Shipping
          </Button>
          <Button inverted color="red">
            Cancel
          </Button>
        </div>
      ) : null}
    </Item>
  );
};

export default SellerProduct;
