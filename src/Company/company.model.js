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
        YearsExperiencie: {
            type: String,
            required: [true, 'Years of experiencie is requiredis required']
        },
        businessCatewgory: {
            type: String,
            required: [true, 'Business Category is required']
        },
        direction: {
            type: String,
            required: [true, 'Direction is required']
        },
        contact: {
            type: String,
            required: [true, 'Contact is required']
        } 
        
    }
)

export default model('Company', companySchema)