import web3 from "@/ethereum/web3";
import { useRouter } from "next/router";
import { Button, Card, Icon, Image } from "semantic-ui-react";

const ProductCard = ({ product }) => {
  const router = useRouter();
  // console.log(key);
  return (
    <Card
      style={{
        boxShadow: "0px 42px 78px -28px rgba(130, 98, 81, 0.69)",
        // cursor: "pointer",
        margin: "0",
      }}
    >
      <Image src={product[2]} ui={false} />
      <Card.Content>
        <Card.Header style={{ textTransform: "capitalize" }}>
          {product[0]}
        </Card.Header>
        <Card.Meta style={{ textTransform: "capitalize" }}>
          {product[1]}
        </Card.Meta>
        <Card.Description style={{ overflowWrap: "break-word" }}>
          <b>Seller:</b> {product[4]}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <b>{web3.utils.fromWei(product[5], "ether")}</b> ETH
        <Button
          onClick={() => router.push(`/${product["id"]}/view-product`)}
          style={{ marginLeft: "33%" }}
          secondary
        >
          Buy now!
        </Button>
      </Card.Content>
    </Card>
  );
};

export default ProductCard;
