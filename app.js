const express = require("express");
const bodyParser = require("body-parser");
const Request = require("request");
const https = require("https");

const app = express();

//app.use(express.static("public")); //MUST need for static files 

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }

    var jasonData = JSON.stringify(data)

    const url="https://us20.api.mailchimp.com/3.0/lists/709db4f4e9";

    const options = {
        method: "POST",
        auth: "fasih1:99f832b440b289aa034106385b87d2a2-us20"
    }

    const request = https.request(url, options, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })

    request.write(jasonData);
    request.end();




})

app.post("/failure" , function(req,res){ // Redirects to the Home Page 
    res.redirect("/");
})



app.listen(process.env.PORT || 3000, function(){
    console.log("Listening on Port 3000");
})


//99f832b440b289aa034106385b87d2a2-us20

//709db4f4e9
