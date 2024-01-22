import { createHmac } from "crypto";

interface SignOptions {
  exp: number;
  data: Record<string, unknown>;
  secret: string;
}

export function sign(options: SignOptions) {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    ...options,
    iat: Date.now(),
    exp: options.exp,
  };

  const base64EncodedHeader = Buffer.from(JSON.stringify(header)).toString(
    "base64url"
  );

  const base64EncodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url"
  );

  const hmac = createHmac("sha256", options.secret);

  const signature = hmac
    .update(`${base64EncodedHeader}.${base64EncodedPayload}`)
    .digest("base64url");

  return `${base64EncodedHeader}.${base64EncodedPayload}.${signature}`;
}
