const { default: Layout } = require("@/components/Layout");
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/new-user.module.css";

const NotFound = () => {
  const router = useRouter();
  return (
    <>
      <Layout />
      <div className={styles.formContainer}>
        <h3>Please Connect your Wallet!</h3>
        <h4>
          Go back to <Link href="/home">home</Link>
        </h4>
      </div>
    </>
  );
};

export default NotFound;
