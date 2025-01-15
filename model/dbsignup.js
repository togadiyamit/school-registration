let express = require('express');
const db = require('../db/connection')

  function register(name, age, institute_type, medium, education_board, class_category, standard, subjects) {
    let return_data = {
        error: true,
        data: [],
        message:''
    }
    let get_subjects_query = "select id, subject_name from subjects where standard = "+standard+"";
    let get_subject = db.executeQuery(get_subjects_query);
    console.log('get_subject: ', get_subject);

    let signup_query = "insert into signup_user(name, age, institute_type, medium, education_board, class_category, standard) values("+name+"," +age+ "," + institute_type +"," +medium+ "," + education_board +"," +class_category+ "," +standard+ "," +subjects+")";
    let signup_user = db.executeQuery(signup_query);

    return_data.data = signup_user;
    return_data.error = false;
    return_data.message = 'signup successfully'
    return return_data;
}
module.exports = {register}