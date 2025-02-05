import Company from "../models/Company.js";
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import generateToken from "../utils/generateToken.js";
// Register a new company
export const registerCompany=async(req,res)=>{
    const {name,email,password}=req.body;

     const imageFile=req.file;
     if(!name || !email || !password || !imageFile){
        return res.json({success:false,message:"Missing Details"})

     }
     try {
        const companyExist=await Company.findOne({email})
        if(companyExist){
            return res.json({success:false,message:"Company Already Registered"})
        }
const salt=await bcrypt.genSalt(10)
const hashPassword=await bcrypt.hash(password,salt)

const imageUpload=await cloudinary.uploader.upload(imageFile.path)
const company=await Company.create({
    name,
    email,
    password:hashPassword,
    image:imageUpload.secure_url

})
res.json({
    success:true,
    company:{
        _id:company._id,
        name:company.name,
        email:company.email,
        image:company.image

    },
    token:generateToken(company._id)

})


        
     } catch (error) {
        res.json({success:false,message:error.message

        })
     }

}
export const loginCompany=async()=>{
    const {email,password}=req.body;
try{
const company=await Company.findOne({email})

if(bcrypt.compare(password,company.password)){
    res.json({
        success:true,
        company:{
            _id:company._id,
            name:company.name,
            email:company.email,
            image:company.image
    
        },
        token:generateToken(company._id)
    })
}
else{
    res.json({success:false,message:"Invalid Email or Password"})
}
}
catch(error){
    res.json({success:false,message:error.message})
}

}

//Get company  data
export const getCompanyData=async(req,res)=>{

}
//Post a new job
export const postJob=async(req,re)=>{
   const {title,description,location,salary}=req.body;
   const companyId=req.company._id
   console.log(companyId,{title,description,location,salary});
   



}
//Get Company Job Applicants
export const getCompanyJobApplicants=async(req,res)=>
{

}
// Get company posted jobs
export const getCompanyPostedJobs=async(req,res)=>{

}
// change the Job Applications Status
export const ChangeJobApplicationsStatus=async(req,res)=>{

}
export const changeVisiblity=async(req,res)=>{

}

