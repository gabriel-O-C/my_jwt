import { createHmac } from "crypto";

interface GenerateSignature {
  secret: string;
  encodedHeader: string;
  encodedPayload: string;
}
export function generateSignature({
  encodedHeader,
  encodedPayload,
  secret,
}: GenerateSignature) {
  const hmac = createHmac("sha256", secret);

  const signature = hmac
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");

  return signature;
}
