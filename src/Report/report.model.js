// Modelo de reporte

import mongoose, { Schema, model } from "mongoose"

const reportSchema = Schema(
    {
        generationDate:{ 
            type: Date,
            default: Date.now
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
        },
        ExelFile: {
            type: String
        }

    }
)

export default model('Report', reportSchema)