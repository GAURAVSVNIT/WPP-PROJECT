import jwt from 'jsonwebtoken';

// Secrets and expiry values from environment variables
const SECRET_KEY = process.env.NEXT_ACCESS_TOKEN_SECRET;
const REFRESH_KEY = process.env.NEXT_REFRESH_TOKEN_SECRET;
const EMAIL_VERIFICATION_SECRET = process.env.NEXT_EMAIL_VERIFICATION_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.NEXT_ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_EXPIRY = process.env.NEXT_REFRESH_TOKEN_EXPIRY;
const EMAIL_TOKEN_EXPIRY = process.env.NEXT_EMAIL_TOKEN_EXPIRY || '24h';

// Generate access token (for authenticated sessions)
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      // Optionally include a flag if the user signed up with Google
      isGoogleUser: user.isGoogleUser || false,
    },
    SECRET_KEY,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
};

// Generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    REFRESH_KEY,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
};

// Generate an email verification token (used during registration for email auth)
const generateEmailVerificationToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    EMAIL_VERIFICATION_SECRET,
    { expiresIn: EMAIL_TOKEN_EXPIRY }
  );
};

// Verify access token
const verifyAccessToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

// Verify refresh token
const verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_KEY);
};

// Verify email verification token
const verifyEmailVerificationToken = (token) => {
  return jwt.verify(token, EMAIL_VERIFICATION_SECRET);
};

export { 
  generateAccessToken, 
  generateRefreshToken, 
  generateEmailVerificationToken,
  verifyAccessToken, 
  verifyRefreshToken,
  verifyEmailVerificationToken 
};
