import jwt from 'jsonwebtoken';

// Function to generate a token and set it as an HTTP-only cookie
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });

  // Set JWT as HTTP-only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  });

  return token;
};

export default generateToken;
