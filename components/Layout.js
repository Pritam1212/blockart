import Image from "next/image";
import styles from "../styles/layout.module.css";
import logo from "../public/img/logo-white.png";
import { Button, Dropdown, Icon, Input, Modal } from "semantic-ui-react";
import { useContext, useState } from "react";
import appContext from "@/context/appContext";
// import { Comfortaa } from "@next/font/google";
import Link from "next/link";
import localFont from "@next/font/local";
import { useRouter } from "next/router";

const myFont = localFont({ src: "../public/fonts/OstrichSans-Bold.otf" });

// const comfortaa = Comfortaa({
//   weight: "700",
//   style: "normal",
//   subsets: ["latin"],
// });

const Layout = () => {
  const context = useContext(appContext);
  const router = useRouter();
  const [searchVal, setSerachVal] = useState("");

  const changeHandler = (e) => {
    setSerachVal(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // console.log(searchVal);
      router.push(`/search?q=${searchVal}`);
    }
  };

  return (
    <div className={styles.navbar}>
      <Link href="/home">
        <Image
          style={{
            marginLeft: "40%",
          }}
          src={logo}
          alt="logo"
          width={62}
          height={62}
        />
      </Link>
      <Link
        href="/home"
        style={{
          marginRight: "10%",
          color: "#000",
        }}
      >
        <h1
          priority="true"
          style={{
            fontSize: "41px",
          }}
          className={myFont.className}
        >
          <b>BlocKart</b>
        </h1>
      </Link>
      <Input
        style={{ width: "450px", marginRight: "8%" }}
        icon={{
          name: "search",
          circular: true,
          link: true,
          onClick: () => {
            router.push(`/search?q=${searchVal}`);
          },
        }}
        placeholder="Search..."
        // fluid
        value={searchVal}
        onChange={changeHandler}
        onKeyPress={handleKeyPress}
      />
      <a
        className={styles.nav}
        onClick={() => router.push(`/${context.userId}/seller-products`)}
      >
        Your products
      </a>
      <a
        className={styles.nav}
        onClick={() => router.push(`/${context.wallet}/buyer-orders`)}
      >
        Your orders
      </a>
      <a className={styles.nav} onClick={() => router.push("/add-product")}>
        Sell Product
      </a>
      <a className={styles.nav} onClick={() => router.push("/cart")}>
        <Icon name="shopping cart" />
        {context.isLogged ? `${context.cart.length}` : ""}
      </a>
      {context.isLogged ? (
        <Dropdown
          text={
            context.wallet.slice(0, 5) + "..." + context.wallet.slice(38, 42)
          }
          className="button"
          style={{
            backgroundColor: "#fff",
            color: "#000",
          }}
        >
          <Dropdown.Menu>
            <Dropdown.Item
              icon="settings"
              text="Edit Profile"
              onClick={() => router.push(`/${context.userId}/edit`)}
            />
            <Dropdown.Item
              icon="log out"
              text="Log out"
              onClick={context.walletDisconnect}
            />
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button onClick={context.walletConnect} inverted>
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default Layout;
