//src/middleware/roleMiddleware.js 

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        if (!roles.includes(req.user.role)) {
            res.status(403)
            throw new Error (`Role ${req.user.role} is not authorized to access this resource`);
        }

        next();
    };
};

module.exports = { authorize };



