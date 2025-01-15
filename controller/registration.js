const express = require("express");
const joi  = require("joi");
// const Routes = require('../index');s
const Routes = express.Router();
const registration = require('../model/dbsignup')
Routes.post('/user_registration',doRegesterSchema, doRegester);

async function doRegesterSchema(req, res, next){
    console.log('req: ', req);
    let schema = joi.object().keys({
        name: joi.string().require(),
        age: joi.number().default(1),
        institute_type: joi.string().require().valid('playhouse', 'school','collage','competitive exam center'),
        medium: joi.string().require().valid('english', 'hindi'),
        education_board: joi.string().require().valid('CBSE, GSAB'),
        class_category: joi.string().require().valid('primary', 'pre-primary', 'secondary', 'higher-secondary'),
        standard: joi.string().require(),
        subjects: joi.array().require(),
    })
    const result  = joi.validate(req.body, schema);
    if(result.error){
        res.json({error: result.error})
    }else {
        next();
    }
}

async function doRegester(req, res){
   let result = registration.register(req.body.name, req.body.age, req.body.institute_type, req.body.medium, req.body.education_board, req.body.class_category, req.body.standard, req.body.subjects)

}

module.exports = {doRegesterSchema, doRegester}