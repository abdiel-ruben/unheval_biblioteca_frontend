// ** Auth Endpoints
export default {
  loginEndpoint: "/jwt/login",
  registerEndpoint: "/jwt/register",
  refreshEndpoint: "/jwt/refresh-token",
  SALIREndpoint: "/jwt/SALIR",

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: "Bearer",

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: "accessToken",
  storageRefreshTokenKeyName: "refreshToken",
};
