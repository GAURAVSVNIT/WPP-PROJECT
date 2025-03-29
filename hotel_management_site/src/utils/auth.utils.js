import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.NEXT_ACCESS_TOKEN_SECRET;
const REFRESH_KEY = process.env.NEXT_REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.NEXT_ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_EXPIRY = process.env.NEXT_REFRESH_TOKEN_EXPIRY;

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            username: user.username,
            email: user.email,
        },
        SECRET_KEY,
        { expiresIn: ACCESS_TOKEN_EXPIRY }
    );
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
        },
        REFRESH_KEY,
        { expiresIn: REFRESH_TOKEN_EXPIRY }
    );
}

const verifyAccessToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
}    
const verifyRefreshToken = (token) => {
    return jwt.verify(token, REFRESH_KEY);
}

export { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken };

