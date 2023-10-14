"use client";

import {
  SismoConnectButton,
  AuthType,
  SismoConnectResponse,
} from "@sismo-core/sismo-connect-react";
import { Dispatch, SetStateAction } from "react";

export default function SismoConnect({
  setTwitterId,
}: {
  setTwitterId: Dispatch<SetStateAction<string | null>>;
}) {
  return (
    <SismoConnectButton
      text="Verify Twitter"
      // overrideStyle={{
      //   backgroundColor: "#ff0303",
      //   color: "#000",
      //   borderRadius: "10px",
      //   padding: "10px",
      //   border: "none",
      //   cursor: "pointer",
      //   width: "fit-content",
      // }}
      theme="light"
      config={{
        appId: process.env.NEXT_PUBLIC_SISMO_APP_ID ?? "",
        vault: {
          impersonate: [
            "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
            "github:leosayous21",
            "twitter:dhadrien_:2390703980",
          ],
        },
      }}
      auths={[
        {
          authType: AuthType.TWITTER,
        },
      ]}
      onResponse={async (response: SismoConnectResponse) => {
        const res = await fetch("/api/verify", {
          method: "POST",
          body: JSON.stringify(response),
        });
        const twitterId = await res.json();

        setTwitterId(twitterId);
      }}
    />
  );
}
