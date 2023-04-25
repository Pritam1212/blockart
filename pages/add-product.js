import Layout from "@/components/Layout";
import appContext from "@/context/appContext";
import web3 from "@/ethereum/web3";
import styles from "../styles/new-user.module.css";
import store from "../ethereum/store";
import Link from "next/link";
const { create } = require("ipfs-http-client");

const { useRouter } = require("next/router");
const { useState, useEffect, useContext } = require("react");
const { Loader, Form, Button, Input, Label } = require("semantic-ui-react");

const addProduct = () => {
  const context = useContext(appContext);

  // const [image, setImage] = useState("");

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
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createProduct();
        // console.log(form);
        // alert("submiytteeeeeddddd");
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const createProduct = async () => {
    try {
      const cost = BigInt(web3.utils.toWei(form.price, "ether"));
      // const accounts = await web3.eth.getAccounts();
      await store.methods
        .addProduct(
          form.name,
          form.category,
          form.imageLink,
          form.description,
          cost
        )
        .send({ from: context.wallet });

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
    if (!form.imageLink) {
      err.imageLink = "Image is required";
    }
    if (!form.description) {
      err.description = "Description is required";
    }
    if (!form.price) {
      err.price = "Price is required";
    }

    return err;
  };

  const imageHandler = async (e) => {
    // e.preventDefault();
    // console.log(e.target.files[0]);
    const image = e.target.files[0];
    const auth =
      "Basic " +
      Buffer.from(
        process.env.INFURA_ID + ":" + process.env.INFURA_SECRET_KEY
      ).toString("base64");
    const ipfs = await create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth, // infura auth credentials
      },
    });
    const result = await ipfs.add(image);
    setForm({
      ...form,
      imageLink: `https://blockart.infura-ipfs.io/ipfs/${result.path}`,
    });
    // console.log(`https://ipfs.io/ipfs/${result.path}`);
  };
  return (
    <>
      <Layout />
      {context.isLogged ? (
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
                  error={
                    errors.imageLink
                      ? { content: "Please select a image!" }
                      : null
                  }
                  label="Image Link"
                  placeholder="Image Link"
                  name="imageLink"
                  onChange={changeHandler}
                  value={form.imageLink}
                  readOnly
                />
                <Label
                  style={{ border: "none" }}
                  as="label"
                  basic
                  htmlFor="upload"
                >
                  <Button
                    icon="upload"
                    label={{
                      basic: true,
                      content: "Select image",
                    }}
                    labelPosition="right"
                  />
                  <input
                    onChange={imageHandler}
                    hidden
                    id="upload"
                    type="file"
                    accept="image/*"
                  />
                </Label>
                <br />
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
                  // type="number"
                />
                <br />
                <Button type="submit" inverted color="brown">
                  Add!
                </Button>
              </Form>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.formContainer}>
          {/* <h1>Add Product</h1>
          <hr />
          <br /> */}
          <h3>Please Connect your Wallet!</h3>
          <h4>
            Go back to <Link href="/home">home</Link>
          </h4>
        </div>
      )}{" "}
    </>
  );
};

export default addProduct;
