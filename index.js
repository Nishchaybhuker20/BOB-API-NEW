const gTTS = require('gtts');
var express = require('express')    
var app = express()

var fs = require("fs")
var efs = require("fs-extra");

const {promisify} = require( 'util' );
const fileInfo = promisify(fs.stat);

const server_port = process.env.PORT || 80;


app.use(express.static(__dirname+'/public'));

app.listen(server_port, function () {
    console.log("Server started on port : " + server_port) ; 
	console.log("http://localhost:"+server_port) ; 
});

app.get("/",function (req,res){
    res.send("API to Convert Text To Speech")
})
// Main end-point Changed
app.get("/audio/:sp",function (req,res){
    console.log(__dirname)
    var speech = req.params.sp;
    var gtts = new gTTS(speech, 'en');
    gtts.save('./public/Voice.mp3', function (err, result){
        if(err) { throw new Error(err); }
        console.log("Text to speech converted!");
        console.log(result);
    });

    res.send("Audio Created")
    // const address = __dirname+ "/Voice.mp3"
 
    // const address = './Voice.mp3'
    // console.log(address);
    // size = fileInfo(address)
    // res.set('content-type', 'audio/mp3');
    // // res.set('content-length', size);
    // res.set('accept-ranges', 'bytes');
    // res.writeHead(200,{"Content-Type": "audio/mp3"});
    // fs.access(`$__dirname/Voice.mp3`,function (exits)
    // {
    //     if(exits){
    //         console.log("-->>>>>>>")
    //         var rstream = fs.createReadStream(address);
    //         console.log("<<<<<<--------")

    //         rstream.pipe(res);
            // rstream.on("data",(dt)=> {
            //     res.writeContinue(dt)
            // })
            // rstream.on("error",(dt)=> {
            //     res.send("404")
            // })
            // rstream.on("end",(dt)=> {
            //     res.end(dt)
            // })


        // }else{
        //     console.log("File Not Found")
        // }
    // })

// res.sendFile(__dirname+"/Voice.mp3")

});

app.get("/move",function (req,res){
    const src = "./Voice.mp3"
    const dest = "./public/Voice.mp3"
    efs.move(src, dest, (err) => {
        if (err) {
            console.log("==>ERROR<==");
            console.log(err);
            res.send(err)
        }
        console.log(`File successfully moved!!`);
      });
      res.send("Moved");
})

app.get("/delete",function(req,res){
    fs.unlink("./public/Voice.mp3",function (err){
        if(err)
        { 
            console.log(err);
          return  res.send(err)
        }
        console.log("File Deleted Successfully");
    });

    res.send("Deleted File")
})