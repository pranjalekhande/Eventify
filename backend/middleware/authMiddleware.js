const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user (with role) to req
    req.user = decoded.user; // Ensure this contains id and role
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authMiddleware;