const mongoose=require('mongoose');

const db_url="mongodb://127.0.0.1/zias"

mongoose.connect(db_url).catch(err=>console.log(err));

const developer_schema=new mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true},
    password:String,
    contactNo:{type:String},
    ongoing_projects:[{type:Number,default:0}],
    projects_completed:[{type:Number,default:0}],
    skills:String
})
const project_schema=new mongoose.Schema({
    name:String,
    details:String,
    startdate:String,
    enddate:String,
    iscomplete:{type:Number,default:0}
})
const admin_schema=new mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true},
    password:{type:String},
    contactNo:{type:String}
})
const temporary_schema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    role:String
})
const admin=mongoose.model('admin',admin_schema);
const developer=mongoose.model('developers',developer_schema);
const project=mongoose.model('projects',project_schema);
const temporary=mongoose.model('unconfirmed users',temporary_schema)
 module.exports={
     developer,
     project,
     admin,
     temporary
 }