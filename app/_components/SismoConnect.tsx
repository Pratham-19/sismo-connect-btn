"use client";

import {
  SismoConnectButton,
  AuthType,
  SismoConnectResponse,
  SismoConnectConfig,
} from "@sismo-core/sismo-connect-react";
import { Dispatch, SetStateAction } from "react";

export default function SismoConnect({
  setTwitterId,
  isFake,
}: {
  setTwitterId: Dispatch<SetStateAction<string | null>>;
  isFake?: boolean;
}) {
  let config: SismoConnectConfig = {
    appId: process.env.NEXT_PUBLIC_SISMO_APP_ID ?? "",
  };

  if (isFake) {
    config = {
      ...config,
      vault: {
        impersonate: [
          "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
          "github:leosayous21",
          "twitter:dhadrien_:2390703980",
        ],
      },
    };
  }
  return (
    <SismoConnectButton
      text={isFake ? "Imperonate Verify Twitter" : "Verify Twitter"}
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
      config={config}
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
