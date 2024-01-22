import { generateSignature } from "./generateSignature";

interface VerifyOptions {
  token: string;
  secret: string;
}

export function verify({ token, secret }: VerifyOptions) {
  const [headerSent, payloadSent, signatureSent] = token.split(".");

  const signature = generateSignature({
    encodedHeader: headerSent,
    encodedPayload: payloadSent,
    secret,
  });

  if (signatureSent !== signature) {
    throw new Error("Invalid JWT.");
  }

  const decodedPayload = JSON.parse(
    Buffer.from(payloadSent, "base64url").toString("utf-8")
  );

  if  (decodedPayload.exp < Date.now()) {
    throw new Error("Expired token.");

  }

  return decodedPayload;
}
