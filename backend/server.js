const express=require('express');
const session=require('express-session');
const jwt=require('jsonwebtoken');
const cors=require('cors');
const {url}=require('./url');
const {developer,project,admin,temporary}=require('./db');
const bcrypt=require('bcrypt');
const bodyparser=require('body-parser');
const nodemailer=require('nodemailer');
const cookieparser=require('cookie-parser');

const app=express();
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))
app.use(cors({
    credentials:true
}))
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin",`${url}`);
    res.header("Access-Control-Allow-Headers",'Accept,Authorization,Origin,Content-Type');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE");
    res.header("Access-Allow-Credentials","true")
    next();
})
app.use(session({key:'user_sid',secret:'suab321',resave:true,saveUninitialized:true,cookie:{maxAge:null}}))
app.use(cookieparser());
const verify=(req,res,next)=>{
    const bearer=req.headers['authorization'];
    if(bearer==='undefined')
        res.status(403).json('No access token');
    else{
        req.token=bearer.split(' ')[1];
        next();
    }

}

//to get the access token 
app.get('/user',(req,res)=>{
   if(req.session.user){
       console.log(req.session.user)
    jwt.sign({user:req.session.user},"suab",(err,token)=>{
        if(err)
            res.status(400).json(err);
        else
            res.status(200).json(token);
        })
    }
    else{
        res.status(400).json("No one");
    }
})
//to get the details of loggedin user
app.get('/name',verify,(req,res)=>{
    jwt.verify(req.token,'suab',(err,authdata)=>{
        if(err)
            res.status(400).json("err verifying token");
        else
            res.status(200).json(authdata);
    })
})

//adminlogin
app.route('/admin_login')
.post((req,res)=>{
    console.log(req.body.email)
    admin.findOne({email:req.body.email}).then(user=>{
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                req.session.user=user
                res.redirect(`${url}/admindashboard`);
            }
        }
        else{
            res.status(400).json('no one');
        }
    }).catch(err=>console.log(err))
})

//developerlogin
app.route('/developerlogin')
.post((req,res)=>{
    console.log(req.body.email)
    developer.findOne({email:req.body.email}).then(user=>{
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                req.session.user=user
                res.redirect(`${url}/developerdashboard`);
            }
        }
        else{
            res.status(400).json('no one');
        }
    }).catch(err=>console.log(err))
})

//creating a user admin or developer
app.post('/create',(req,res)=>{
    console.log(req.body.email)
    const db=new temporary
    db.email=req.body.email;
    db.role=req.body.role;
    db.save().then(user=>{
        res.status(201).json(user);
        confirmemail(user.email);
    }).catch(err=>res.status(400).json(err));
})

const transporter=nodemailer.createTransport({
    service:"Gmail",
    auth:{
        type:"OAuth2",
        user:"test9051571833@gmail.com",
        clientId:"960759155894-705e9e3bgkj6bdmv78l7alh99h6sfl90.apps.googleusercontent.com",
        clientSecret:"GC0Ob-uCTsQ2jr-cVFAWbXF0",
        refreshToken:"1/WGXzM4vnAFB8hA-pMdSnvXgkqA9emRVT4WeD4Zvsvig"
    }
})

const confirmemail=(email)=>{
    var mailoptions={
        from:"Zias <test9051571833>",
        to:email,
        subject:"Verification email for Zias Tecnologies",
        text:"Click the link below to confirm",
        html:'<p>Click the link for verification<a href="http://localhost:3000/password/'+email+'">Verify</a></p>'
    }
    transporter.sendMail(mailoptions,(err,res)=>{
        if(err)
            console.log(err)
        else
            console.log(res);
    })
}

//getting the password and details of new user based on developer and admin redirect is done accordingly
app.post('/updatepassword/:email',(req,res)=>{
    temporary.findOne({email:req.params.email}).then(user=>{
        if(user.role==="admin"){
            const db=new admin
            db.email=req.params.email;
            db.name=req.body.name
            db.password=bcrypt.hashSync(req.body.password,10);
            db.contactNo=req.body.contactNo
            db.save().then(user=>{
                if(user){
                    console.log(user)
                    temporary.findOneAndDelete({email:req.params.email});
                    req.session.user=user;
                    res.redirect(`${url}/admindashboard`)
                }
                else
                    res.status(500).json("Error")
            }).catch(err=>res.json(err));
        }
        else{
            const db=new developer
            db.email=req.params.email;
            db.password=bcrypt.hashSync(req.body.password,10);
            db.name=req.body.name;
            db.contactNo=req.body.contactNo;
            db.save().then(user=>{
                if(user){
                    console.log(user)
                    temporary.findOneAndDelete({email:req.params.email});
                    //req.session.user=user;
                    res.redirect(`${url}/developers_details/${user.email}`)
                }
                else
                    res.status(500).json("Error");
            }).catch(err=>res.json(err))
        }
    })
            
})

//getting the details of developer
app.post('/updatedeveloper/:email',(req,res)=>{
    developer.findOneAndUpdate({email:req.params.email}).then(user=>{
        user.skills=req.body.skills
        user.save().then(user=>{
            req.session.user=user;
            res.redirect(`${url}/developerdashboard`);
        }).catch(err=>console.log(err));
    })
})

//creating a superuser for testing purpose only
app.post('/superuser',(req,res)=>{
    const db=new admin
    db.name=req.body.name
    db.email=req.body.email;
    db.password=bcrypt.hashSync(req.body.password,10)
    db.save().then(user=>{
        if(user)
            res.redirect(`${url}/admin_dashboard`);
        else
            res.status(400).json("error")
    }).cathc
})

//checking if the user can create the project
app.get('/cancreate/:token',(req,res)=>{
    jwt.verify(req.params.token,"suab",(err,authdata)=>{
        if(err)
            res.status(400).json(err);
        else{
            admin.findOne({email:authdata.user.email}).then(user=>{
                if(user)
                    res.status(200).json('yes');
                else
                    res.status(400).json("no");
            }).catch(err=>res.status(400).json(err));
        }
    })
})
//creatingproject
app.post('/createproject',(req,res)=>{
    const db=new project   
    db.name=req.body.name;
    db.details=req.body.details;
    db.startdate=req.body.startdate;
    db.enddate=req.body.enddate;
    db.save().then(user=>{
        if(user)
            res.status(201).json(user);
        else
            res.status(400).json("failed");
    }).catch(err=>res.status(400).json(err))
})




app.listen(process.env.PORT||3002);