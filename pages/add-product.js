import Layout from "@/components/Layout";
import appContext from "@/context/appContext";
import web3 from "@/ethereum/web3";
import styles from "../styles/new-user.module.css";
import store from "../ethereum/store";

const { useRouter } = require("next/router");
const { useState, useEffect, useContext } = require("react");
const { Loader, Form, Button, Input, Label } = require("semantic-ui-react");

const addProduct = () => {
  const context = useContext(appContext);

  const [form, setForm] = useState({
    // walletAddress: context.wallet,
    name: "",
    category: "",
    imageLink: "",
    description: "",
    price: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageLink, setImageLink] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createProduct();
        // alert("submiytteeeeeddddd");
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const createProduct = async () => {
    try {
      const cost = parseInt(web3.utils.toWei(form.price, "ether"));
      const accounts = await web3.eth.getAccounts();
      await store.methods
        .addProduct(
          form.name,
          form.category,
          form.imageLink,
          form.description,
          cost
        )
        .send({ from: accounts[0] });

      router.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let err = {};

    if (!form.name) {
      err.name = "Name is required";
    }
    if (!form.category) {
      err.category = "Category is required";
    }
    if (!form.description) {
      err.description = "Description is required";
    }
    if (!form.price) {
      err.price = "Price is required";
    }

    return err;
  };

  return (
    <>
      <Layout />
      <div className={styles.formContainer}>
        <h1>Add Product</h1>
        <hr />
        <br />
        <div>
          {isSubmitting ? (
            <Loader active inline="centered" />
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Input
                fluid
                error={
                  errors.name
                    ? { content: "Please enter the product name!" }
                    : null
                }
                label="Product Name"
                placeholder="Product Name"
                name="name"
                onChange={changeHandler}
                value={form.name}
              />
              <Form.Input
                fluid
                error={
                  errors.category
                    ? { content: "Please enter the category!" }
                    : null
                }
                label="Category"
                placeholder="Category"
                name="category"
                onChange={changeHandler}
                value={form.category}
              />
              <Form.TextArea
                // fluid
                error={
                  errors.description
                    ? { content: "Please enter the description!" }
                    : null
                }
                label="Description"
                placeholder="Description"
                name="description"
                onChange={changeHandler}
                value={form.description}
              />
              <Form.Input
                fluid
                label="Image Link"
                placeholder="Image Link"
                name="imageLink"
                onChange={changeHandler}
                value={form.imageLink}
              />
              <label>
                <b>Price</b>
              </label>
              <Input
                fluid
                error={
                  errors.price ? { content: "Please enter the price!" } : null
                }
                label="ETH"
                placeholder="Price"
                name="price"
                onChange={changeHandler}
                value={form.price}
                labelPosition="right"
                type="number"
              />
              <br />
              <Button type="submit" inverted color="brown">
                Create!
              </Button>
            </Form>
          )}
        </div>
      </div>
    </>
  );
};

export default addProduct;
