import { jwtVerify, SignJWT } from "jose";



export const verify = async (token) => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.NEXT_JWT_TOKEN_SECRET)
    );
    console.log("Payload", payload);
    return payload;
  } catch (error) {
    throw new Error(error);
  }
};

export const sign = async (payload) => {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1m")
      .sign(new TextEncoder().encode(process.env.NEXT_JWT_TOKEN_SECRET));
    console.log("Token", token);
    return token;
  } catch (error) {
    throw new Error(error);
  }
};
