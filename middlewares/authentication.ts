import jwt from 'jsonwebtoken';
import express from 'express';
// function authenticate(req:express.Request, res:express.Response, next:express.NextFunction) {
//     // Check for the JWT token in the request headers
//     const token = req.header('Authorization');
  
//     if (!token) {
//       return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }
  
//     try {
//       // Verify the token with the secret key
//       const decoded = jwt.verify(token, secretKey);
  
//       // Store user information in the request object
//       req.user = decoded;
  
//       // Continue to the next middleware or route handler
//       next();
//     } catch (error) {
//       // Token verification failed
//       res.status(403).json({ message: 'Invalid token.' });
//     }
//   }
  





