const Data = require("../models/data");

//Function to extract only required properties
function getBody(obj){
    let param = {};
    if(obj.name) param.name = obj.name;
    if(obj.email) param.email = obj.email;
    if(obj.country) param.country = obj.country;
    return param;
}

module.exports = {
    home: (req,res,next)=>{
        try
        {
            res.sendFile(process.cwd() + '/views/index.html');
        }
        catch(err)
        {
            next(err);
        }
    },

    new: (req,res,next) => {
        let param = getBody(req.body);
        Data.create(param)
        .then((data)=>{
            res.locals.data = data;
            next();
        })
        .catch(err=>{
            console.error(`Error occurred during creation: ${err.message}`);
            next(err);
        })
    },

    index: (req,res,next) => {
        Data.find({})
        .then(data=>{
            if(data.length > 0) {
                res.locals.data = data;
                next();
            }
            else{
                next(new Error("No data in Database"));
            }
            
        })
        .catch(err=>{
            console.error(`Error occurred while retrieving: ${err.message}`);
            next(err);
        })
    },

    read: (req,res,next) => {
        Data.findById(req.params.id)
        .then(data=>{
            if(data) {
                res.locals.data = data;
                next();
            }
            else{
                next(new Error("data not found"));
            }
        })
        .catch(err=>{
            console.error(`Error occurred while retrieving: ${err.message}`);
            next(err);
        })
    },

    update: (req,res,next) => {
        let param = getBody(req.body);
        Data.findByIdAndUpdate(req.params.id,{$set: param},{new:true})
        .then(data => {
            res.locals.data = data;
            next();
        })
        .catch(err=>{
            console.error(`Error occurred while updating: ${err.message}`);
            next(err);
        })
    },

    delete: (req,res,next) => {
        Data.findByIdAndRemove(req.params.id)
        .then(data => {
            res.locals.data = data;
            next();
        })
        .catch(err => {
            console.error(`Error occurred while deleting: ${err.message}`);
            next(err);
        })
    },

    respondJSON: (req,res) => {
        res.json({
            message: "success",
            data: res.locals.data
        },null,"\t");
    },

    errorJSON: (err,req,res,next) => {
        if (err) {
            res.json({
                message: `${err.message}`,
                data: null
            },null,2);
        }
    },

    notFoundJSON: (req,res,next) => {
        next(new Error("Not Found"));
    }
};