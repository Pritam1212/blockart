import "@/styles/globals.css";
import { Roboto } from "@next/font/google";
import "semantic-ui-css/semantic.min.css";
import { useState } from "react";
import appContext from "@/context/appContext";

const roboto = Roboto({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const [wallet, setWallet] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserId] = useState("");
  const walletConnect = () => {
    console.log("hmm");
  };

  return (
    <main className={roboto.className}>
      <appContext.Provider
        value={{
          wallet,
          setWallet,
          isLogged,
          setIsLogged,
          userId,
          setUserId,
          walletConnect,
        }}
      >
        <Component {...pageProps} />
      </appContext.Provider>
    </main>
  );
}
