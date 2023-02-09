import { Button } from "semantic-ui-react";
import appContext from "@/context/appContext";
import { useContext } from "react";

export default function Landing() {
  const context = useContext(appContext);

  return (
    <>
      <h1>landing page</h1>
      <Button onClick={context.walletConnect}> connect wallet</Button>
      {context.isLogged && <h3>{context.wallet}</h3>}
    </>
  );
}
