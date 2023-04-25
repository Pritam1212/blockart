import web3 from "@/ethereum/web3";
import { useRouter } from "next/router";
import { Button, Card, Icon, Image } from "semantic-ui-react";

const SearchCard = ({ product }) => {
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
      <Image
        style={{
          height: "200px",
          width: "200px",
          objectFit: "cover",
          cursor: "pointer",
        }}
        centered
        src={product["imageLink"]}
        onClick={() => router.push(`/${product["id"]}/view-product`)}
      />
      <Card.Content>
        <Card.Header style={{ textTransform: "capitalize" }}>
          {product["name"]}
        </Card.Header>
        <Card.Meta style={{ textTransform: "capitalize" }}>
          {product["category"]}
        </Card.Meta>
        <Card.Description style={{ overflowWrap: "break-word" }}>
          <b>Seller:</b> {product["seller"]}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <b>{web3.utils.fromWei(product["price"], "ether")}</b> ETH
        <Button
          onClick={() => router.push(`/${product["id"]}/view-product`)}
          // style={{ marginLeft: "38%" }}
          secondary
          floated="right"
        >
          Buy now!
        </Button>
      </Card.Content>
    </Card>
  );
};

export default SearchCard;
