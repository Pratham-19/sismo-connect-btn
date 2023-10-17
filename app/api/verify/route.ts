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
  console.log(sismoConnectResponse);
  try {
    const result: SismoConnectVerifiedResult = await sismoConnect.verify(
      sismoConnectResponse,
      {
        auths: [{ authType: AuthType.TWITTER }],
      }
    );
    const twitterId = result.getUserId(AuthType.TWITTER);

    return NextResponse.json(
      {
        twitterId,
      },
      { status: 200 }
    );
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(e.message, { status: 500 });
  }
}
