const express=require('express');
const session=require('cookie-session');
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
app.post('/create',verify,(req,res)=>{
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
                    temporary.findOneAndRemove({email:req.params.email});
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
                    temporary.findOneAndRemove({email:req.params.email});
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
    developer.findOneAndUpdate({email:req.params.email},{skills:req.body.skills},{new:true}).then(user=>{
        console.log(user);
        req.session.user=user;
        res.redirect(`${url}/developerdashboard`)
    }).catch(err=>console.log(err))
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
    })
})

//checking if the user can create the project
app.get('/cancreate',verify,(req,res)=>{
    jwt.verify(req.token,"suab",(err,authdata)=>{
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
app.post('/createproject',verify,(req,res)=>{
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

//getting all the developers
app.get('/getalldeveloper',verify,(req,res)=>{
    jwt.verify(req.token,"suab",(err,authdata)=>{
        if(err){
            res.status(400).json(err);
        }
        else{
            admin.findById({_id:authdata.user._id},).then(user=>{
                if(user){
                    developer.find({},{name:true}).then(user=>{
                        res.status(200).json(user);
                    })
                }
            }).catch(err=>res.status(err).json(err))
        }
    })
})

//getting all the developers
app.get('/get_all_developers/:proid',verify,(req,res)=>{
    jwt.verify(req.token,"suab",(err,authdata)=>{
        if(authdata){
            developer.find({}).then(user=>{
                if(user){
                    const d1=user;
                    const d1_id=d1.map(i=>{return (i._id).toString()});
                    project.findById({_id:req.params.proid}).then(user=>{
                        var activedev=[];
                        var activedev_id=[];
                        console.log(d1_id);
                        var y=user.developers.map(i=>{return (i.devid)});
                        var y1=JSON.stringify(y);
                        d1_id.forEach(i=>{
                            if(y1.indexOf(i) === -1)
                                activedev_id.push(i);
                        })
                        console.log(activedev_id);
                        activedev_id.forEach(i=>{
                            var index=d1_id.indexOf(i)
                            if(index !== -1)
                                activedev.push(d1[index]);
                        })
                        console.log(activedev);
                        res.status(200).json(activedev)
                    })
                }
            })
        }
    })
})

//assigndevelopers to project
app.put('/assigndevelopers/:id',verify,(req,res)=>{
    jwt.verify(req.token,"suab",(err,authdata)=>{
        if(err)
            res.status(400).json(err);
        else{
            admin.findById({_id:authdata.user._id}).then(user=>{
                if(user){
                    //console.log(req.body.developers);
                    req.body.developers.map(developerid=>{
                    project.findById({_id:req.params.id}).then(user=>{
                    developer.findOneAndUpdate({_id:developerid},{$addToSet:{'ongoing_projects':{'name':user.name,'proid':user.id,'currentStatus':"Not yet Started"}}},{new:true}).then(user=>{
                     project.findOneAndUpdate({_id:req.params.id},{$addToSet:{'developers':{'name':user.name,'devid':developerid,'currentStatus':"Not yet started"}}},{new:true})
                     .then(user=>{
                        //console.log(user);
                     }).catch((err)=>console.log(err));
                    }).catch((err)=>console.log(err))
                }).catch(err=>console.log(err))
                 })
                 res.redirect('http://localhost:3000/admindashboard');
                }
                else{
                    res.status(400).json("You are not an admin");
                }
            }).catch(err=>{res.status(400).json(err)});   
    }  
    })
})

//getting project details
app.get('/project/:type',verify,(req,res)=>{
    project.find({type:req.params.type},{name:true,_id:true}).then(user=>{
        if(user)
            res.status(200).json(user);
    }).catch(err=>{
        console.log(err);
        res.status(400).json(err);
    })
})

//getting project detail based on their Id
app.get('/projectdetail/:id',verify,(req,res)=>{
    jwt.verify(req.token,"suab",(err,authdata)=>{
        if(err)
            res.status(400).json(err);
        else{
            admin.findOne({email:authdata.user.email}).then(user=>{
                if(user){
                    project.findById({_id:req.params.id}).then(user=>{
                        if(user)
                            res.status(200).json(user);
                        else
                            res.status(400).json("no projects");
                    }).catch(err=>{res.status(400).json(err)})
                }
            }).catch(err=>{res.status(400).json(err)})
        }
    })
})

//getting details of project for developer
app.get('/projectdetailfordev/:id',verify,(req,res)=>{
    jwt.verify(req.token,"suab",(err,authdata)=>{
        project.findById({_id:req.params.id},{details:true,developers:true}).then(user=>{
            if(user)
                res.status(200).json(user);
            else
                res.status(200).json("no one project");
        }).catch(err=>res.status(400).json(err));
    })
})

//getting developers in project
app.get('/getdeveloperinproject/:proid',(req,res)=>{
    project.findById({_id:req.params.proid},{developers:true}).then(user=>{
       res.status(200).json(user);
    }).catch(err=>{res.status(400).json(err)})
})

//getting developers in project for developers
app.get('/getdeveloperinprojectfordev/:proid',verify,(req,res)=>{
    jwt.verify(req.token,"suab",(err,authdata)=>{
        if(authdata){
            project.findById({_id:req.params.proid},{developers:true}).then(user=>{
                if(user){
                    const developers=user.developers.filter(i=>{
                        if(i.devid!==authdata.user._id)
                            return i;
                    })
                    res.status(200).json(developers);
                }
            }).catch(err=>{res.status(400).json("err in database operation")})
        }
        else
            res.status(400).json("err verifying token");
    })
})



//getting developers name based on their id
app.get('/developerdetail/:id',(req,res)=>{
    developer.findById({_id:req.params.id}).then(user=>{
        res.status(200).json(user);
    }).catch(err=>{res.status(400),json(err)});
})

//getting projects of developer
app.get('/getproject/:type',verify,(req,res)=>{
    jwt.verify(req.token,"suab",(err,authdata)=>{
        if(err)
            res.status(400).json("not able to verify token")
        else{
           developer.findById({_id:authdata.user._id}).then(user=>{
               if(user.ongoing_projects.length===0)
                    res.status(200).json("No projects");
                else
                    res.status(200).json(user.ongoing_projects);
           })
        }
    })
})
//getting status of a developer based on that particular project
app.get('/getstatus/:proid',verify,(req,res)=>{
    jwt.verify(req.token,"suab",(err,authdata)=>{
        if(authdata){
        developer.findById({_id:authdata.user._id}).then(user=>{
            if(user){
                const resData=user.ongoing_projects.filter(i=>{
                    if(i.proid===req.params.proid)
                       return i;
                })
                res.status(200).json(resData);
            }
            
        }).catch(err=>{res.status(400).json(err)})
    }
        
        else
            res.status(400).json(err);
            
    })
})

//updating the status of a particular project of a particular developer 
app.put('/updatestatus/:proid',verify,(req,res)=>{
    jwt.verify(req.token,"suab",(err,authdata)=>{
        if(err)
            res.status(400).json(err);
        else{
            project.update(
                {_id:req.params.proid,'developers.devid':authdata.user._id},
                {$set:{'developers.$.currentStatus':req.body.status}},(err,result)=>{
                    if(err)
                        res.status(400).json(err);
                }
            )
           developer.update(
            {_id:authdata.user._id,'ongoing_projects.proid':req.params.proid},
            {$set:{'ongoing_projects.$.currentStatus':req.body.status}},(err,result)=>{
                if(err)
                    res.status(400).json(err)
                else
                    res.redirect(`http://localhost:3000/mypro/${req.params.proid}`)
            }
           ) 
        }
    })
})

//updating the type of project either notstarted completed or ongoinging
app.put('/updateprojectstatus/:proid',verify,(req,res)=>{
    jwt.verify(req.token,"suab",(err,authdata)=>{
        if(err)
            res.status(400).json(err);
        else{
            admin.findById({_id:authdata.user._id}).then(user=>{
                if(user){
                    project.findOneAndUpdate({_id:req.params.proid},{type:req.body.type},{new:true}).then(user=>{
                        res.status(200).json(user);
                    }).catch(err=>{res.status(400).json(err)});
                }
                else
                    res.status(400).json("Not an admin");
            }).catch(err=>{res.status(400).json(err)})
        }
    })
})




//removing a developer from a that particular project
app.delete('/deletedevfromproject/:devid/:proid',verify,(req,res)=>{
    jwt.verify(req.token,"suab",(err,authdata)=>{
        if(authdata){
        admin.findById({_id:authdata.user._id}).then(user=>{
            if(user){
                project.findOneAndUpdate({_id:req.params.proid},{$pull:{'developers':{'devid':req.params.devid}}},{new:true}).then(user=>{
                    if(user){
                        developer.findOneAndUpdate({_id:req.params.devid},{$pull:{'ongoing_projects':{'proid':req.params.proid}}},{new:true}).
                        then(user=>{
                            if(user){
                                res.redirect(`http://localhost:3000/admindashboard`)
                            }
                            else
                                res.status(400).json("undefiend error")
                        }).catch(err=>res.status(400).json(err));
                    }
                    else
                        res.status(400).json("undefined errro");
                }).catch(err=>res.status(400).json(err));
            }
            else
                res.status(400).json("You are not authorized to this delete");
        })
       }
       else
       res.status(400).json("You are not authorized to this delete");
    })
    
})

app.listen(process.env.PORT||3002);