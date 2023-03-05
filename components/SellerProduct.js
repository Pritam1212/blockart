import web3 from "@/ethereum/web3";
import styles from "../styles/seller-products.module.css";
import { Button, Icon, Item } from "semantic-ui-react";
import { useContext, useState } from "react";
import appContext from "@/context/appContext";
import store from "../ethereum/store";
import Escrow from "@/ethereum/escrow";
import { useRouter } from "next/router";

const SellerProduct = ({ product }) => {
  const context = useContext(appContext);
  const [isLoading, setIsLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [buyerAddress, setBuyerAddress] = useState("");
  const router = useRouter();

  // console.log(product);
  let status;
  // let img =
  // "https://ipfs.io/ipfs/QmX3abi8WCv3zAHXsCzhvCJ8RX5Zv8if3ZeFK3B5J3WLkb?filename=Zephyrus%20GX550_1920x1080.jpg";
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

  const approveHandler = async () => {
    setIsLoading(true);
    let escrowAddress;
    await store.getPastEvents(
      "OrderCreated",
      {
        filter: {
          seller: context.wallet,
          productId: product.id,
        },
        fromBlock: 0,
        toBlock: "latest",
      },
      (error, events) => {
        if (!error) {
          const obj = JSON.parse(JSON.stringify(events));
          const array = Object.keys(obj);

          escrowAddress = obj[array[0]].returnValues.escrow;
          //   console.log(escrowAddress);
        } else {
          console.log(error);
        }
      }
    );
    // console.log("escrow address", escrowAddress);
    const escrow = Escrow(escrowAddress);

    await escrow.methods.accept().send({
      from: context.wallet,
    });
    setIsLoading(false);
    router.replace(`/${context.userId}/seller-products`);
  };

  const cancelHandler = async () => {
    setIsLoading(true);
    let escrowAddress;
    await store.getPastEvents(
      "OrderCreated",
      {
        filter: {
          seller: context.wallet,
          productId: product.id,
        },
        fromBlock: 0,
        toBlock: "latest",
      },
      (error, events) => {
        if (!error) {
          const obj = JSON.parse(JSON.stringify(events));
          const array = Object.keys(obj);

          escrowAddress = obj[array[0]].returnValues.escrow;
          //   console.log(escrowAddress);
        } else {
          console.log(error);
        }
      }
    );
    // console.log("escrow address", escrowAddress);
    const escrow = Escrow(escrowAddress);

    await escrow.methods.reject().send({
      from: context.wallet,
    });
    setIsLoading(false);
    router.replace(`/${context.userId}/seller-products`);
  };

  const buyerHandler = async () => {
    await store.getPastEvents(
      "OrderCreated",
      {
        filter: {
          seller: context.wallet,
          productId: product.id,
        },
        fromBlock: 0,
        toBlock: "latest",
      },
      (error, events) => {
        if (!error) {
          const obj = JSON.parse(JSON.stringify(events));
          const array = Object.keys(obj);

          setBuyerAddress(obj[array[0]].returnValues.buyer);
        } else {
          console.log(error);
        }
      }
    );

    setClicked(true);
  };

  return (
    <Item>
      <Item.Image size="medium" src={product[2]} />

      <Item.Content>
        <Item.Header as="a">{product[0]}</Item.Header>
        <Item.Meta>{product[1]}</Item.Meta>
        <Item.Description>{product[3]}</Item.Description>
        <Item.Extra>
          Price: <b>{web3.utils.fromWei(product[5], "ether")}</b>ETH
        </Item.Extra>
        <Item.Extra>Status: {status}</Item.Extra>
        <Item.Description>
          Buyer:
          {clicked ? (
            <b>{buyerAddress}</b>
          ) : (
            <Icon
              onClick={buyerHandler}
              style={{ cursor: "pointer" }}
              name="eye"
            />
          )}
        </Item.Description>
      </Item.Content>
      {status === "Processing" ? (
        <div className={styles.approveButton}>
          <Button
            loading={isLoading}
            onClick={approveHandler}
            inverted
            color="green"
          >
            Approve for Shipping
          </Button>
          <Button onClick={cancelHandler} inverted color="red">
            Cancel
          </Button>
        </div>
      ) : null}
    </Item>
  );
};

export default SellerProduct;
