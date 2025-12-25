const authorization = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.userRole)) {
        return res
          .status(403)
          .json({ msg: "Access Denied! !!! You are not Authorized" });
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal server Error", error });
    }
  };
};

module.exports = authorization;