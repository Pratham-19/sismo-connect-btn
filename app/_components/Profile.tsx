"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import SismoConnect from "./SismoConnect";
import { useState } from "react";

export const Profile = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [twitterId, setTwitterId] = useState<string | null>(null);
  const [addr, setAddr] = useState<string | null>(null);

  if (isConnected) {
    return (
      <div className="text-center">
        <h1 className="mb-3">Welcome</h1>
        <p>Address: {address}</p>
        {twitterId && <p>Twitter Id: {twitterId}</p>}
        {addr && <p>Sismo proof address: {addr}</p>}
        <div className="flex justify-center items-center gap-3 mt-5">
          <button
            className="rounded-xl bg-white p-4 text-black"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
          {/* <SismoConnect setTwitterId={setTwitterId} isFake={true} /> */}
          <SismoConnect setTwitterId={setTwitterId} setAddr={setAddr} />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center ">
      <h1 className="mb-3">Connect wallet to continue</h1>
      <ConnectButton chainStatus="icon" />
    </div>
  );
};
