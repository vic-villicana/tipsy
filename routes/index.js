const express     = require('express'),
    app           = express(),
    router        = express.Router(),
    {check, validationResult} = require('express-validator'),
    flash = require('connect-flash'),
    bodyParser    = require('body-parser'),    
    mongoose      = require('mongoose'),
    passport      = require('passport'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    Job           = require('../models/jobs'),
    Signups       = require('../models/signup'),
    User          = require('../models/user');
    
router.use(bodyParser.urlencoded({extended:true}));
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/tipsy",{useNewUrlParser:true});

router.use(require("express-session")({
  secret:'tipsy forever',
  resave:false,
  saveUninitialized:false
}));
router.use(passport.initialize());
router.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use(require('connect-flash')());
router.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

router.get("/", (req, res) =>{
    res.render('index');
})
    
router.get("/signups", isLoggedIn, (req,res)=>{
  
  Signups.find({}, (err, newSignups)=>{
    if(err){
      console.log(err)
    }else{
      res.render("signups", {signups:newSignups})
    }
  });
});

router.post("/signups", [
  check('email', 'email address must be vali email').not().isEmpty().isEmail().normalizeEmail(),
  ],
  (req, res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
      req.flash("error", "please input info in right format")
      res.render('index');
    }else{
      let email   = req.body.email;
      let newSignup  = {email:email};
      Signups.create(newSignup,(err, newCreated)=>{
        if(err){
          console.log(err)
        }else{
          res.redirect('/thankyou')
        }
      });
    }

});

router.get("/services", (req, res)=>{
    res.render("services");
  });
    
router.get("/story", (req, res)=>{
    res.render('story');
  });
    
router.get("/contact", (req, res)=>{
    res.render("contact")
  });



router.get("/thankyou", (req, res)=>{
  res.render("thankyou");
});

router.get("/register", (req, res)=>{
  res.render("register");
});

router.post("/register", (req, res)=>{ 
  let newUser = new User({username: req.body.username})
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register")
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/login");
    });
  });
});

router.get("/login", (req, res)=>{
  res.render("login");
});

router.post("/login", passport.authenticate("local", 
  {
    successRedirect:"/clients",
    failureRedirect:"/login"
  }), (req, res)=>{
});

router.get("/logout",(req, res)=>{
  req.logout();
  res.redirect("/thankyou");
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

router.get("/clients",isLoggedIn, (req, res)=>{
  Job.find({}, (err, newJobs)=>{
    if(err){
      console.log(err);
    }else{
      res.render("clients", {job:newJobs})
    }
  });
});

router.post("/clients", [
  check('name','name should be more than 3 letters').not().isEmpty().isLength({min: 5}).trim().escape(),
  check('email').not().isEmpty().isEmail().normalizeEmail(),
  check('date').optional(),
  check('drinkers').not().isEmpty().isInt(),
  check('description').optional().trim().escape(),
  ],
    (req, res)=>{
      const errors = validationResult(req);
      console.log(req.body);
      if(!errors.isEmpty()){
        req.flash("error", "please input info in right format")
        res.render('contact', {errors:errors});
        console.log(errors)
      }else{
        let name = req.body.name;
        let email = req.body.email;
        let date = req.body.eventdate;
        let drinkers = req.body.drinkers;
        let description = req.body.description;
        let newClient = {name:name, email:email, date:date, drinkers:drinkers, description:description}
        Job.create(newClient, (err, newCreated)=>{
          if(err){
            req.flash('error', "please fill out correctly")
            console.log(err)
          }else{
            res.redirect("thankyou");
          }
        });  
      }

});  

router.get("/clients/:id", (req, res)=>{
  Job.findById(req.params.id, (err, newBlah)=>{
    if(err){
      console.log(err);
    }
    else {
      res.render('show', {jobs: newBlah})
    }
  })
});

    module.exports = router;