const Data = require("../models/data");
const {body, validationResult} = require('express-validator');

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
            res.status(200);
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
            res.locals.status = 201;
            res.locals.data = data;
            res.location(`/api/data/${data._id}`);
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
                res.locals.status = 400;
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
                res.locals.status = 400;
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
                if(data) {
                    res.locals.data = data;
                    next();
                }
                else{
                    res.locals.status = 400;
                    next(new Error("data not found"));
                }
            })
            .catch(err=>{
                console.error(`Error occurred while updating: ${err.message}`);
                next(err);
            })
        
    },

    delete: (req,res,next) => {
        Data.findByIdAndRemove(req.params.id)
        .then(data => {
            if(data) {
                res.locals.data = null;
                next();
            }
            else{
                res.locals.status = 400;
                next(new Error("data does not exist"));
            }
        })
        .catch(err => {
            console.error(`Error occurred while deleting: ${err.message}`);
            next(err);
        })
    },

    respondJSON: (req,res) => {
        const status = res.locals.status || 200;
        res.status(status).json({
            message: "success",
            data: res.locals.data
        },null,"\t");
    },

    errorJSON: (err,req,res,next) => {
        if (err) {
            const status = res.locals.status || 500;
            res.status(status).json({
                message: `${err.message}`,
                data: null
            },null,2);
        }
    },

    notFoundJSON: (req,res,next) => {
        res.locals.status = 404;
        next(new Error("route undefined"));
    },

    checkBody: async (req,res,next) => {
        //First check if request body is empty
        if(!Object.keys(req.body).length){
            next(new Error("request body is empty"));
        }

        //Ensure that there are no fields outside those specified
        await body('*').custom((value,{req,location,path}) => {
            return ( 
            path === "name" || 
            path === "email" ||
            path === "country");
        }).withMessage((value,{req,location,path}) => `field: ${path} is not allowed`)
        .run(req);

        //If the name property is provided, confirm it is not empty
        if(req.body.hasOwnProperty("name")){
            await body('name',"Name is required").notEmpty()
            .bail()
            .matches(/^[a-zA-Z0-9\s-'_]+$/i)
            .withMessage("Invalid name")
            .trim().run(req);
        }

        //If email property is provided, confirm it is not empty and is a proper email
        if(req.body.hasOwnProperty("email")){
            await body('email').notEmpty().withMessage("Email is required")
            .bail()
            .isEmail().withMessage("Invalid Email")
            .bail()
            .normalizeEmail()
            .custom(async value => {
                const data = await Data.find({ email: value });
                if (data.length) {
                    return Promise.reject('E-mail already in use');
                }
            })
            .run(req);
        }

        //If country is provided, confirm it is not empty
        if(req.body.hasOwnProperty("country")){
            await body('country',"Country is required").notEmpty()
            .bail()
            .matches(/^[a-zA-Z-'\s]+$/i)
            .withMessage("Invalid country name")
            .bail()
            .trim().run(req);
        }

        //Aggregate the validation result
        const errors = validationResult(req);
        
        //If there are validation errors, compile them together
        if(!errors.isEmpty()){
            res.locals.status = 400;
            next(new Error(errors.array().reduce((prev,{msg:cur})=>`${prev}${cur}; `,"").trimEnd()));
        }
        next();
    }
};