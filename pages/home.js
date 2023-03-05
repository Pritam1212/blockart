import Layout from "@/components/Layout";
import styles from "../styles/home.module.css";
import ProductCard from "@/components/ProductCard";
import store from "../ethereum/store";
const Home = ({ products }) => {
  // console.log(products[3][2]);
  return (
    <>
      <Layout />
      <div className={styles.container}>
        {products.map((product) => {
          // console.log(product["id"]);

          return <ProductCard product={product} />;
        })}
      </div>
    </>
  );
};

Home.getInitialProps = async () => {
  const count = await store.methods.getProductCount().call();
  let arr = [];
  for (let index = 0; index < count; index++) {
    const id = await store.methods.getProductIdAt(index).call();
    let product = await store.methods.getProduct(id).call();
    product = { ...product, id };
    arr.push(product);
  }

  return { products: arr };
};

export default Home;
