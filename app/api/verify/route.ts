// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// in src/app/api/verify/route.ts

import {
  AuthType,
  ClaimType,
  SismoConnect,
  SismoConnectVerifiedResult,
} from "@sismo-core/sismo-connect-server";
import { NextResponse } from "next/server";

const sismoConnect = SismoConnect({
  config: {
    appId: process.env.NEXT_PUBLIC_SISMO_APP_ID ?? "",
    vault: {
      impersonate: [
        "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        "github:leosayous21",
        "twitter:dhadrien_:2390703980",
      ],
    },
  },
});

// this is the API route that is called by the SismoConnectButton
export async function POST(req: Request) {
  const sismoConnectResponse = await req.json();
  try {
    const result: SismoConnectVerifiedResult = await sismoConnect.verify(
      sismoConnectResponse,
      {
        auths: [{ authType: AuthType.TWITTER }],
      }
    );
    const twitterId = result.getUserId(AuthType.TWITTER);
    return NextResponse.json(twitterId, { status: 200 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(e.message, { status: 500 });
  }
}
