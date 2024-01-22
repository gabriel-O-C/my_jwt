import { generateSignature } from "./generateSignature";

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

  const signature = generateSignature({
    encodedHeader: base64EncodedHeader,
    encodedPayload: base64EncodedPayload,
    secret: options.secret,
  });

  return `${base64EncodedHeader}.${base64EncodedPayload}.${signature}`;
}
