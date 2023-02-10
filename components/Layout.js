import Image from "next/image";
import styles from "../styles/layout.module.css";
import logo from "../public/img/logo-white.png";
import { Button, Dropdown } from "semantic-ui-react";
import { useContext } from "react";
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
  return (
    <div className={styles.navbar}>
      <Image src={logo} alt="logo" width={62} height={62} priority />
      <Link
        href="/home"
        style={{
          marginRight: "76%",
          color: "#000000",
        }}
      >
        <h1
          style={{
            fontSize: "41px",
          }}
          className={myFont.className}
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
            backgroundColor: "#fff",
            color: "#000",
          }}
        >
          <Dropdown.Menu>
            <Dropdown.Item
              icon="settings"
              text="View Profile"
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
