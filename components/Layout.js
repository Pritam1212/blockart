import Image from "next/image";
import styles from "../styles/layout.module.css";
// import logo from "../public/img/logo.png";
import logo from "../public/img/icon.png";
import { Button, Dropdown } from "semantic-ui-react";
import { useContext } from "react";
import appContext from "@/context/appContext";
import { Comfortaa } from "@next/font/google";
import Link from "next/link";

const comfortaa = Comfortaa({
  weight: "700",
  style: "normal",
  subsets: ["latin"],
});

const Layout = () => {
  const context = useContext(appContext);

  return (
    <div className={styles.navbar}>
      <Image src={logo} alt="logo" width={62} height={62} priority />
      <Link
        href="/home"
        style={{
          marginRight: "70%",
          color: "#0c0c0c",
        }}
      >
        <h1
          style={{
            fontSize: "50px",
          }}
          className={comfortaa.className}
        >
          <b>BlocKart</b>
        </h1>
      </Link>
      {context.isLogged ? (
        <Dropdown
          text={
            context.wallet.slice(0, 6) + "..." + context.wallet.slice(38, 42)
          }
          className="button"
          style={{
            backgroundColor: "#A5673F",
            color: "#fff",
          }}
        >
          <Dropdown.Menu>
            <Dropdown.Item
              icon="log out"
              text="Log out"
              onClick={context.walletDisconnect}
            />
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button onClick={context.walletConnect} basic color="brown">
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default Layout;
