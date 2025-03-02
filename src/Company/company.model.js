//Modelo de compañia
import { Schema, model } from "mongoose"

const companySchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [25, `Can't be overcome 25 characters`]
        },
        levelImpact: {
            type: String,
            required: [true, 'Level of Impact is required']
        },
        yearsExperiencie: {
            type: String,
            required: [true, 'Years of experiencie is requiredis required']
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required']
        },
        direction: {
            type: String,
            required: [true, 'Direction is required']
        },
        contact: {
            type: String,
            required: [true, 'Contact is required']
        },
        registrationDay:{
            type: Date,
            default: Date.now
        }
        
    }
)

export default model('Company', companySchema)