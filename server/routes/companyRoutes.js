import express from 'express'
import { ChangeJobApplicationsStatus, changeVisiblity, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controller/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middleware/authMiddleware.js';

const router=express.Router();

//Register a company
router.post('/register',upload.single('image'),registerCompany)

//company login
router.post('/login',loginCompany)

//get company data
router.get('/company',protectCompany,getCompanyData)
//post a job 
router.post('/post-job',protectCompany,postJob)

//get Applicants data of company
router.get('/applicants',protectCompany,getCompanyJobApplicants)
//Get company jobs data

router.get('/list-jobs',protectCompany,getCompanyPostedJobs)

//change applications status
router.post('/change-status',protectCompany,ChangeJobApplicationsStatus)
// change application visiblity
router.post('/change-visiblity',protectCompany,changeVisiblity)
export default router