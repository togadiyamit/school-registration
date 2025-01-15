const express = require('express');
const app = express();
const Routes = express.Router();
const registration = require('./model/dbsignup')
const joi  = require("joi");


app.use(Routes)
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.post('/user_registration', doRegesterSchema, doRegester);

 function doRegesterSchema(req, res, next){
    let schema = joi.object().keys({
        name: joi.string().required(),
        age: joi.number().default(1),
        institute_type: joi.string().required().valid('playhouse', 'school','collage','competitive exam center'),
        medium: joi.string().required().valid('english', 'hindi'),
        education_board: joi.string().required().valid('CBSE, GSAB'),
        class_category: joi.string().required().valid('primary', 'pre-primary', 'secondary', 'higher-secondary'),
        standard: joi.string().required(),
        subjects: joi.array().required(),
    })
    const result  = schema.validate(req.body);
    if(result.error){
        res.json({error: result.error})
    }else {
        next();
    }
    next();
}

async function doRegester(req, res){
    console.log('req: ', req.body);
   let result = registration.register(req.body.name, req.body.age, req.body.institute_type, req.body.medium, req.body.education_board, req.body.class_category, req.body.standard, req.body.subjects)

   if(result.error){
    res.json({error: result.message})
   } else{
    res.json({data: result.data})
   }
}

const PORT = 3333;
app.listen(PORT, (error) => {
    if(!error){
    console.log("server is running on port: "+ PORT+"");
    } else {
        console.log(err)
    }
})

module.exports = {doRegesterSchema, doRegester}
