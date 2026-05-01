function errorMiddleware(err, req, res, next) {
    console.error('❌ Error:', err.message);

    if (err.status) {
        return res.status(err.status).json({
            error: err.message
        });
    }

    res.status(500).json({
        error: process.env.NODE_ENV === 'production'
            ? 'An unexpected error occurred'
            : err.message
    });
}

module.exports = errorMiddleware;
