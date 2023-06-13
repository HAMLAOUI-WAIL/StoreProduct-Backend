import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"name must be provided "]
    },
    price:{
        type:String,
        required:[true,"price product must be provided "]
    },
    featured:{
        type:Boolean,
        default:false,
    },
    rating:{
        type:Number,
        default:3,
    },
    // Date 
    CreateAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        // limite possible option of company
        enum:{
            values:['HamCAMP','DAC_CAMP','C_ESS'],
            message:'{VALUE} is not supported'
        }
        // enum:['HamCAMP','DAC_CAMP','C_ESS']
    }
})

const Product = mongoose.model("Product", ProductSchema);

export default Product;