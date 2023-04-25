import Layout from "@/components/Layout";
// import appContext from "@/context/appContext";
import styles from "../../styles/new-user.module.css";

const { useRouter } = require("next/router");
const { useState, useEffect, useContext } = require("react");
const { Loader, Form, Button } = require("semantic-ui-react");

const editUser = ({ user }) => {
  //   const context = useContext(appContext);

  const [form, setForm] = useState({
    walletAddress: user.walletAddress,
    firstName: user.firstName,
    lastName: user.lastName,
    mobile: user.mobile,
    address: user.address,
    email: user.email,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        editUser();
        // alert("submiytteeeeeddddd");
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const editUser = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
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

    if (!form.firstName) {
      err.firstName = "First Name is required";
    }
    if (!form.address) {
      err.address = "Address is required";
    }
    if (!form.mobile) {
      err.mobile = "Mobile number is required";
    }
    if (!form.email) {
      err.email = "E-mail is required";
    }

    return err;
  };
  return (
    <>
      <Layout />
      <div className={styles.formContainer}>
        <h1>Edit Profile</h1>
        <hr />
        <br />
        <div>
          {isSubmitting ? (
            <Loader active inline="centered" />
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Input
                fluid
                label="Wallet Address"
                name="walletAddress"
                onChange={changeHandler}
                value={form.walletAddress}
                readOnly
              />
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  error={
                    errors.firstName
                      ? { content: "Please enter your first name!" }
                      : null
                  }
                  label="First Name"
                  placeholder="First Name"
                  name="firstName"
                  onChange={changeHandler}
                  value={form.firstName}
                />
                <Form.Input
                  fluid
                  label="Last Name"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={changeHandler}
                  value={form.lastName}
                />
              </Form.Group>
              <Form.Input
                fluid
                error={
                  errors.mobile
                    ? { content: "Please enter your mobile number!" }
                    : null
                }
                label="Mobile"
                placeholder="Mobile"
                name="mobile"
                onChange={changeHandler}
                value={form.mobile}
              />
              <Form.TextArea
                // fluid
                error={
                  errors.address
                    ? { content: "Please enter your address!" }
                    : null
                }
                label="Address"
                placeholder="Address"
                name="address"
                onChange={changeHandler}
                value={form.address}
              />
              <Form.Input
                fluid
                error={
                  errors.email
                    ? { content: "Please enter your email address!" }
                    : null
                }
                label="E-mail"
                placeholder="E-mail"
                name="email"
                onChange={changeHandler}
                value={form.email}
              />
              <Button type="submit" inverted color="brown">
                Edit!
              </Button>
            </Form>
          )}
        </div>
      </div>
    </>
  );
};

editUser.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/users/${id}`, {
    method: "GET",
  });
  const { data } = await res.json();

  return { user: data };
};

export default editUser;
