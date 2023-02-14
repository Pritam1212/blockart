import web3 from "@/ethereum/web3";
import { Button, Card, Icon, Image } from "semantic-ui-react";

const ProductCard = ({ product }) => {
  return (
    <Card
      raised={true}
      style={{
        boxShadow: "0px 42px 78px -28px rgba(130, 98, 81, 0.69)",
        // cursor: "pointer",
      }}
    >
      <Image
        src="https://ipfs.io/ipfs/QmX3abi8WCv3zAHXsCzhvCJ8RX5Zv8if3ZeFK3B5J3WLkb?filename=Zephyrus%20GX550_1920x1080.jpg"
        ui={false}
      />
      <Card.Content>
        <Card.Header>{product[0]}</Card.Header>
        <Card.Meta>
          {
            /* <span className="date">Joined in 2015</span>
             */
            product[1]
          }
        </Card.Meta>
        <Card.Description style={{ overflowWrap: "break-word" }}>
          <b>Seller:</b> {product[4]}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <b>{web3.utils.fromWei(product[5], "ether")}</b> ETH
        <Button style={{ marginLeft: "35%" }} secondary>
          Buy now!
        </Button>
      </Card.Content>
    </Card>
  );
};

export default ProductCard;
