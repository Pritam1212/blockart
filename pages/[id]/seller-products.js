import web3 from "@/ethereum/web3";
import { Image, Item } from "semantic-ui-react";
import styles from "../../styles/seller-products.module.css";
import store from "../../ethereum/store";
import SellerProduct from "@/components/SellerProduct";

const { default: Layout } = require("@/components/Layout");

const sellerProducts = ({ products }) => {
  // console.log(products);
  return (
    <>
      <Layout />
      <div className={styles.container}>
        <Item.Group>
          {products.map((product) => {
            return (
              <>
                <SellerProduct product={product} />
                <br />
              </>
            );
          })}
        </Item.Group>
      </div>
    </>
  );
};

sellerProducts.getInitialProps = async () => {
  const accounts = await web3.eth.getAccounts();
  let prod = [];
  await store.getPastEvents(
    "ProductCreated",
    {
      filter: { seller: accounts[0] },
      fromBlock: 0,
      toBlock: "latest",
    },
    (error, events) => {
      if (!error) {
        const obj = JSON.parse(JSON.stringify(events));
        const array = Object.keys(obj);
        for (let index = 0; index < array.length; index++) {
          prod.push(obj[array[index]].returnValues.id);
        }
        console.log("product created event", prod);
      } else {
        console.log(error);
      }
    }
  );

  let data = [];
  for (let index = 0; index < prod.length; index++) {
    const product = await store.methods.getProduct(prod[index]).call();
    data.push(product);
  }

  return { products: data };
};

export default sellerProducts;
