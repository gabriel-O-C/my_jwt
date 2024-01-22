import { sign } from "./jwt/sign";
import { verify } from "./jwt/verify";

const secret = "my_secret"

const token = sign({
  exp: Date.now() + 24 * 60 * 60 * 1000,
  data: {
    sub: "test@test",
  },
  secret
});



verify({token, secret})
