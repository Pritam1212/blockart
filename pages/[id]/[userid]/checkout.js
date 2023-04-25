import appContext from "@/context/appContext";
import web3 from "@/ethereum/web3";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import {
  Button,
  Divider,
  Grid,
  Image,
  Popup,
  Segment,
} from "semantic-ui-react";
import store from "../../../ethereum/store";
// import styles from "../../../styles/checkout.module.css";

const { default: Layout } = require("@/components/Layout");

const checkout = ({ props }) => {
  const [loading, setLoading] = useState(false);
  const context = useContext(appContext);
  let userData = props.data;
  let productData = props.product;
  // console.log(productData.id);
  const router = useRouter();

  const placingOrder = async () => {
    setLoading(true);
    try {
      await store.methods.placeOrder(productData.id).send({
        from: context.wallet,
        value: productData[5],
      });
      if (context.cart.includes(productData.id)) {
        const res = await fetch(`/api/users/${context.userId}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            $pull: {
              cart: `${productData.id}`,
            },
          }),
        });
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    router.push(`/${context.wallet}/buyer-orders`);
  };

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
            <Image centered size="small" src={productData[2]} />
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
              {context.isLogged ? (
                <Button
                  loading={loading}
                  onClick={placingOrder}
                  icon="edit"
                  color="green"
                >
                  Place Order!
                </Button>
              ) : (
                <Popup
                  content="You must log in!"
                  trigger={
                    <Button icon="edit" color="green">
                      Place Order!
                    </Button>
                  }
                />
              )}
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
  return { props: { product, data } };
};

export default checkout;
