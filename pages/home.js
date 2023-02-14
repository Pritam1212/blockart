import Layout from "@/components/Layout";
import styles from "../styles/home.module.css";
import ProductCard from "@/components/ProductCard";
import store from "../ethereum/store";
const Home = ({ products }) => {
  return (
    <>
      <Layout />
      <div className={styles.container}>
        {products.map((product) => {
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
    const product = await store.methods.getProduct(id).call();
    await arr.push(product);
  }

  return { products: arr };
};

export default Home;
