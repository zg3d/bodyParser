const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

 
// parse application/json
app.use(bodyParser.json());

app.use(express.static("public"));
app.get("/",(req,res)=>{

    res.render("index",{
        title:'Home Page'
    });


});


app.get("/contact-us",(req,res)=>{

    res.render("contactus",{
        title: "Contact Us"
    });


});



//this route handles the data after the form is submitted 
app.post("/contact-us",(req,res)=>{
    const errorMessage = [];

    if(req.body.fName === "")
    {
        errorMessage.push("PLEASE ENTER A FIRST NAME!!!!");
    }
    if(req.body.lName === "")
    {
        errorMessage.push("PLEASE ENTER A LAST NAME!!!!");
    }
    if(!(/\S/.test(req.body.message)))
    {
        errorMessage.push("PLEASE ENTER A MESSAGE!!!!");
    }

    if(errorMessage.length>0)
    {
        res.render("contactus",{
            title:"Contact Us Page",
            messages : errorMessage,
            firstName : req.body.fName,
            lastName : req.body.lName,
            message : req.body.message,
        });
    }

    else {
        res.render("index",{
            title : "Contact Us Page",
            message : `Welcome ${req.body.fName} ${req.body.lName}`,
        });

    }

});

const PORT = 3000;

app.listen(PORT);