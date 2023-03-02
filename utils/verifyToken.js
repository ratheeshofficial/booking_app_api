import jwt from "jsonwebtoken";

export const verifytoken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("token", token);

  if (!token) {
    return res.send("you are not authenticated");
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    // console.log(user);
    if (err) return res.send("Token is not valid");
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifytoken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.send("You are not authorized");
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  // console.log("req", req.body);
  verifytoken(req, res, next, () => {
    // console.log("user", req.user);
    if (req.user.isAdmin) {
      next();
    } else {
      res.send("You are not authorized");
    }
  });
};
