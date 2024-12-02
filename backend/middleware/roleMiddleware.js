const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
      try {
        if (!req.user || req.user.role !== requiredRole) {
           console.log(req.user.role ,requiredRole) 
          return res.status(403).json({ msg: "Access denied: Insufficient permissions" });
        }
        next();
      } catch (error) {
        console.error("Role-based access error:", error);
        res.status(500).send("Server error");
      }
    };
  };
  
  module.exports = roleMiddleware;
  