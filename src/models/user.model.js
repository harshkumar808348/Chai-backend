import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
         username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true  
            // agar searching field zayda acche se enable karni hai to app index trur kar sakte hai
         } ,

          email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            
          },
          fullName:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            index:true
          },
          avatar:{
            type:string, // cloudinary url
            required:true,
          },
          covserImage:{
            type:String
          },
          watchHistorty:[{
            type:Schema.Types.ObjectId,
            ref:"Video"
          }],
          password:{
            type:String,
            required:[true,'password is required'],
            
          },
          refreshToken:{
            type:String
          },
      },
     {timestamps:true} 
)


userSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hashSync(this.password , 10)
    next()
})

userSchema.methods.generateAccessToken = function (){
   return  jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullname,
    },
    process.env.ACCESS_TOKEN_EXPIRY,  
    {
        expiresIn:process.env.JWT_LIFETIME
    }
)
}
userSchema.methods.generateRefreshToken = function (){
    return  jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullname,
    },
    process.env.ACCESS_TOKEN_EXPIRY,  
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY 

    }
)
}



userSchema.methods.isPasswordCorrect  = async function (password){
   return  bcrypt.compare(password , this.password)
}







export const User  = mongoose.model("User" , userSchema)