import appContext from "@/context/appContext";
import web3 from "@/ethereum/web3";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Button, Divider, Grid, Image, Segment } from "semantic-ui-react";
import store from "../../../ethereum/store";
import styles from "../../../styles/checkout.module.css";

const { default: Layout } = require("@/components/Layout");

const checkout = ({ props }) => {
  let userData = props.data;
  let productData = props.product;
  // console.log(userData, productData);
  const router = useRouter();
  return (
    <>
      <Layout />
      <Segment
        style={{
          width: "900px",
          marginTop: "35px",
          marginLeft: "310px",
          borderRadius: "7px",
          boxShadow: "var(--box-shadow)",
        }}
        placeholder
      >
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column textAlign="center">
            <h2>User Information</h2>
            <Divider />
            <h4>Name:</h4>
            {userData.firstName + " " + userData.lastName}
            <h4>Wallet:</h4>
            {userData.walletAddress}
            <h4>Mobile:</h4>
            {userData.mobile}
            <h4>E-mail:</h4>
            {userData.email}
            <h4>Address for delivery:</h4>
            {userData.address}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Divider />
            <Button icon="edit" primary>
              Edit!
            </Button>
          </Grid.Column>

          <Grid.Column verticalAlign="middle" textAlign="center">
            <h2>Product Information</h2>
            <Divider />
            <Image
              centered
              size="small"
              src="https://ipfs.io/ipfs/QmX3abi8WCv3zAHXsCzhvCJ8RX5Zv8if3ZeFK3B5J3WLkb?filename=Zephyrus%20GX550_1920x1080.jpg"
            />
            <h4>Product:</h4>
            {productData[0]}
            <h4>Category:</h4>
            {productData[1]}
            <h4>Description:</h4>
            {productData[3]}
            <h4>Price:</h4>
            {web3.utils.fromWei(productData[5], "ether")} ETH
            <h4>Seller:</h4>
            {productData[4]}
            <Divider />
            <div style={{ display: "flex" }}>
              <Button icon="edit" color="green">
                Place Order!
              </Button>
              <Button onClick={() => router.back()} icon="edit" color="red">
                Cancel!
              </Button>
            </div>
          </Grid.Column>
        </Grid>

        <Divider vertical>CHECKOUT!</Divider>
      </Segment>
    </>
  );
};

checkout.getInitialProps = async ({ query }) => {
  let params = { query };
  let id = params["query"]["id"];
  let userid = params["query"]["userid"];
  let product = await store.methods.getProduct(id).call();
  product = { ...product, id };
  const res = await fetch(`http://localhost:3000/api/users/${userid}`, {
    method: "GET",
  });
  const { success, data } = await res.json();
  console.log(success, data);
  return { props: { product, data } };
};

export default checkout;
