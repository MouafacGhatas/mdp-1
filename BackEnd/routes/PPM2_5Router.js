const express = require('express');
const bodyParser = require('body-parser');
const Parameter = require('../models/Parameters');


const PPM2_5Router = express.Router();

var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


PPM2_5Router.route('/:echelle')
.get((req,res,next) => {
    switch(req.params.echelle){
        case "perHour" :
            Parameter.aggregate([
                { $group : { 
                _id : { year: { $year : "$timestamp" },
                        month: { $month : "$timestamp" },
                        week:{$week : "$timestamp"},
                        day: { $dayOfMonth : "$timestamp" },
                        hour: {$hour : "$timestamp"}},
                         
                avg : {$avg:"$PPM2_5"},
                sum : {$sum:"$PPM2_5"}, //equivalent Pluie_cumulee par Heure
                min: {$min:"$PPM2_5"},
                max : {$max:"$PPM2_5"}},
        
            },
            {$limit:24},
            {$sort : {_id:1}}
             //day: { $dayOfMonth : "$timestamp" }  ,
             //hour: {$hour : "$timestamp"}  }}
            ])
            .then(response => {
                console.log(response.map(doc => doc._id));
                res.setHeader('Content-Type', 'application/json');
                const resultat = response.map( doc =>  {
                    return {
                    year:doc._id.year,
                    month:doc._id.month,
                    week : doc._id.week,
                    day : doc._id.day,
                    hour : doc._id.hour,
                    avg : doc.avg,
                    sum : doc.sum,
                    min : doc.min,
                    max:doc.max
                }
                });
                res.json(resultat);
            })
            break;
        case "perDay" :
            Parameter.aggregate([{ $group : { 
                _id : { year: { $year : "$timestamp" },
                        month: { $month : "$timestamp" },
                        week:{$week : "$timestamp"},
                        day: { $dayOfMonth : "$timestamp" }}, 
                avg : {$avg:"$PPM2_5"},
                sum : {$sum:"$PPM2_5"}, //equivalent Pluie_cumulee par 24 heure
                min: {$min:"$PPM2_5"},
                max : {$max:"$PPM2_5"}},
                
            },
            {$limit:7},
            {$sort : {_id:1}}
            ])
            .then(response => {
                console.log(response.map(doc => doc._id));
                res.setHeader('Content-Type', 'application/json');
                const resultat = response.map( doc =>  {
                    return {
                    year:doc._id.year,
                    month:doc._id.month,
                    week : doc._id.week,
                    day : doc._id.day,
                    avg : doc.avg,
                    sum : doc.sum,
                    min : doc.min,
                    max:doc.max
                }
                });
                res.json(resultat);
            })
            break;
        case "perWeek" :
            Parameter.aggregate([{ $group : { 
                _id : { year: { $year : "$timestamp" },
                        month: { $month : "$timestamp" },
                        week:{$week : "$timestamp"}}, 
                avg : {$avg:"$PPM2_5"},
                sum : {$sum:"$PPM2_5"},
                min: {$min:"$PPM2_5"},
                max : {$max:"$PPM2_5"}},
                
            }
            ,
            {$limit:7},
            {$sort : {_id:1}}
            ])
            .then(response => {
                console.log(response.map(doc => doc._id));
                res.setHeader('Content-Type', 'application/json');
                const resultat = response.map( doc =>  {
                    return {
                    year:doc._id.year,
                    week : doc._id.week,
                    avg : doc.avg,
                    sum : doc.sum,
                    min : doc.min,
                    max:doc.max
                }
                });
                res.json(resultat);
            })
            break;
        case "perMonth" :
            Parameter.aggregate([{ $group : { 
                _id : { year: { $year : "$timestamp" },
                        month: { $month : "$timestamp" }},
                        avg : {$avg:"$PPM2_5"},
                        sum : {$sum:"$PPM2_5"},
                        min: {$min:"$PPM2_5"},
                        max : {$max:"$PPM2_5"}}},
                        {$limit:12},
                        {$sort : {_id:1}}
            ])
            .then(response => {
                res.setHeader('Content-Type', 'application/json');
                const resultat = response.map( doc =>  {
                    return {
                    year: doc._id.year,
                    month :doc._id.month,
                    avg : doc.avg,
                    sum : doc.sum,
                    min : doc.min,
                    max:doc.max
                }
                });
                res.json(resultat);}
                )
            break;
        case "perYear" :
            Parameter.aggregate([{ $group : { 
                _id : { year: { $year : "$timestamp" }}, 
                avg : {$avg:"$PPM2_5"},
                sum : {$sum:"$PPM2_5"},
                min: {$min:"$PPM2_5"},
                max : {$max:"$PPM2_5"}}}
    ])
            .then(response => {
                console.log(response.map(doc => doc._id));
                res.setHeader('Content-Type', 'application/json');
                const resultat = response.map( doc =>  {
                    return {
                    year: doc._id.year,
                    avg : doc.avg,
                    sum : doc.sum,
                    min : doc.min,
                    max:doc.max
                }
                });
                res.json(resultat);
            })
            break;
        case "instantanee":
            res.setHeader('Content-Type', 'application/json');
            // define an empty query document
            const query = {};
            // sort in descending (-1) order by length
            const sort = { length: 1 };
            const limit = 10;
            Parameter.find({},{PPM2_5: 1 , timestamp:1}).sort(sort).limit(limit).then(
                response=>{ console.log(response) ; res.json(response) ;}
            )
            break;
        default :
            res.setHeader('Content-Type','application/json');
            next(err);
            }})
module.exports = PPM2_5Router ;