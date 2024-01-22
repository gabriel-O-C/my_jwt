import { generateSignature } from "./generateSignature";

interface VerifyOptions {
  token: string
  secret: string
}

export function verify({token, secret}: VerifyOptions) {
  const [headerSent, payloadSent, signatureSent] = token.split('.')

  const signature = generateSignature({encodedHeader: headerSent, encodedPayload: payloadSent, secret})

  if (signatureSent !== signature) {
    throw new Error('Invalid JWT.')
  }

  console.log('token ok')
}
