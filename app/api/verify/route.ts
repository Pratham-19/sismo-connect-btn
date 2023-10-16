// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// in src/app/api/verify/route.ts

import {
  AuthType,
  SismoConnect,
  SismoConnectVerifiedResult,
} from "@sismo-core/sismo-connect-server";
import { NextResponse } from "next/server";

const sismoConnect = SismoConnect({
  config: {
    appId: process.env.NEXT_PUBLIC_SISMO_APP_ID ?? "",
  },
});

export async function POST(req: Request) {
  const sismoConnectResponse = await req.json();

  try {
    const result: SismoConnectVerifiedResult = await sismoConnect.verify(
      sismoConnectResponse,
      {
        auths: [
          { authType: AuthType.TWITTER },
          { authType: AuthType.EVM_ACCOUNT },
        ],
      }
    );
    const twitterId = result.getUserId(AuthType.TWITTER);
    const evmAccount = result.getUserId(AuthType.EVM_ACCOUNT);

    return NextResponse.json(
      {
        twitterId,
        evmAccount,
      },
      { status: 200 }
    );
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(e.message, { status: 500 });
  }
}
