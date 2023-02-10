import "@/styles/globals.css";
import { Roboto } from "@next/font/google";
import "semantic-ui-css/semantic.min.css";
import { useState } from "react";
import appContext from "@/context/appContext";
import web3 from "@/ethereum/web3";
import Web3Token from "web3-token";
import { useRouter } from "next/router";

const roboto = Roboto({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [wallet, setWallet] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserId] = useState("");

  const walletConnect = async () => {
    const your_address = (await web3.eth.getAccounts())[0];

    const token = await Web3Token.sign(
      (msg) => web3.eth.personal.sign(msg, your_address),
      {
        statement: "This signature is required for you to get signed in.",
        expires_in: "2 days",
        nonce: new Date().getTime(),
      }
    );

    // console.log("Token created:", token);

    const { address, body } = await Web3Token.verify(token);

    // console.log("address recovered", address, body);
    setIsLogged(true);
    setWallet(address);
    await fetchUser(address);
  };

  const walletDisconnect = () => {
    setWallet("");
    setIsLogged(false);
  };

  const fetchUser = async (address) => {
    const res = await fetch(`http://localhost:3000/api/wallet/${address}`, {
      method: "GET",
    });
    const { success, data } = await res.json();

    if (success) {
      setUserId(data[0]._id);
      // console.log(data[0]._id);
      // console.log(userId);
      router.replace("/home");
    } else {
      router.push("/new-user");
    }
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
          walletDisconnect,
        }}
      >
        <Component {...pageProps} />
      </appContext.Provider>
    </main>
  );
}
