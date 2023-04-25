const { default: Layout } = require("@/components/Layout");
import SearchCard from "@/components/SearchProduct";
import store from "../ethereum/store";
import styles from "../styles/home.module.css";

const Search = ({ products }) => {
  console.log(products);
  return (
    <>
      <Layout />
      <div className={styles.container}>
        {products.length > 0 ? (
          products.map((product) => {
            // console.log(product["id"]);

            return <SearchCard product={product} key={product["id"]} />;
          })
        ) : (
          <h1 style={{ width: "400px", marginLeft: "550px" }}>
            No results found!
          </h1>
        )}
      </div>
    </>
  );
};

Search.getInitialProps = async ({ query }) => {
  console.log(query.q);
  let search = [];
  await store.getPastEvents(
    "ProductCreated",
    {
      filter: { name: query.q },
      fromBlock: 0,
      toBlock: "latest",
    },
    (error, events) => {
      if (!error) {
        // console.log("here", events);
        const obj = JSON.parse(JSON.stringify(events));
        // console.log(obj);
        const array = Object.keys(obj);
        // console.log(obj[array]);
        for (let i = 0; i < array.length; i++) {
          let str = obj[array[i]].returnValues.name.toLowerCase();
          let sub = query.q.toLowerCase();
          if (str.startsWith(sub.slice(0, Math.max(str.length - 1, 1)))) {
            search = [...search, obj[array[i]].returnValues];
          }
        }
        // search = obj[array[0]].returnValues.name;
        // console.log("product created event", obj[array[0]].returnValues.id);
      } else {
        console.log(error);
      }
    }
  );
  //   console.log("search..", search);
  return { products: search };
};

export default Search;
