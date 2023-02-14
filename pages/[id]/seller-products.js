import web3 from "@/ethereum/web3";
import { Image, Item } from "semantic-ui-react";
import store from "../../ethereum/store";

const { default: Layout } = require("@/components/Layout");

const sellerProducts = ({ products }) => {
  console.log(products);
  return (
    <>
      <Layout />
      <Item.Group>
        <Item>
          <Item.Image
            size="tiny"
            src="https://react.semantic-ui.com/images/wireframe/image.png"
          />

          <Item.Content>
            <Item.Header as="a">Header</Item.Header>
            <Item.Meta>Description</Item.Meta>
            <Item.Description>
              <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            </Item.Description>
            <Item.Extra>Additional Details</Item.Extra>
          </Item.Content>
        </Item>

        <Item>
          <Item.Image
            size="tiny"
            src="https://react.semantic-ui.com/images/wireframe/image.png"
          />

          <Item.Content>
            <Item.Header as="a">Header</Item.Header>
            <Item.Meta>Description</Item.Meta>
            <Item.Description>
              <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            </Item.Description>
            <Item.Extra>Additional Details</Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
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
    async (error, events) => {
      if (!error) {
        const obj = JSON.parse(JSON.stringify(events));
        const array = Object.keys(obj);
        for (let index = 0; index < array.length; index++) {
          await prod.push(obj[array[index]].returnValues.id);
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
