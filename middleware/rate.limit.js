//Limitar la cantidad de solicitudes
import rateLimit from "express-rate-limit"

export const limiter = rateLimit(
    {
        windowMs: 5 *1000,
        max: 10,
        message: {
            message: "You're blocked, wait 15 minutes"
        }
    }
)