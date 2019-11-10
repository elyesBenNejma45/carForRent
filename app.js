require('babel-register') // compile everything from ES6 and ES5  
const {success, error} = require('./functions')
const mysql = require('mysql')
const bodyParser = require('body-parser')// Parse incoming request bodies in a middleware before your handlers
const express = require('express') // routing responsibility
const morgan = require('morgan') // http request middelware
const config = require('./config')

const db = mysql.createConnection({
    host: 'localhost',
    database: 'tester',
    user: 'root',
    password: ''
})

db.connect((err) => { // database connection

    if (err)
        console.log(err.message)
    else {

        console.log('Connected.')

        const app = express()

        let CarsRouter = express.Router()

        app.use(morgan('dev'))
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        CarsRouter.route('/cars/:id') // CarsRouter is a variable which contain the route declared in config.json

            
            .get((req, res) => {

                db.query('SELECT * FROM cars WHERE id = ?', [req.params.id], (err, result) => { // select from tabs all the data
                    if (err) {
                        res.json(error(err.message)) // in case there is an sql rror
                    } else {

                        if (result[0] != undefined) { // if it is not undefind it means we have data in database so we display the data
                            res.json(success(result[0]))
                        } else {
                            res.json(error('Wrong id')) // in case we put an id which is not in dtabase
                        }

                    }
                })

            })

            
            .put((req, res) => {

                if (req.y.model) {

                    db.query('SELECT * FROM car WHERE id = ?', [req.params.id], (err, result) => { // i tried first to find the id that I tested with in body
                        if (err) {
                            res.json(error(err.message))
                        } else {

                            if (result[0] != undefined) {

                                db.query('SELECT * FROM car WHERE model = ? AND id != ?', [req.body.model, req.params.id], (err, result) => { // try to find a name but with different id
                                    if (err) {
                                        res.json(error(err.message)) // in case error
                                    } else {

                                        if (result[0] != undefined) {
                                            res.json(error('same name')) // if I find I can not put the same name
                                        } else {

                                            db.query('UPDATE car SET model = ? , engine = ?, currentLocation =?, numberOfDoors =? WHERE id = ?', [req.body.model, req.body.engine,req.body.currentLocation,req.body.numberOfDoors, req.params.id], (err, result) => {
                                                if (err) {
                                                    res.json(error(err.message))
                                                } else {
                                                    res.json(success(true))
                                                }
                                            })

                                        }

                                    }
                                })

                            } else {
                                res.json(error('Wrong id'))
                            }

                        }
                    })

                } else {
                    res.json(error('no name value'))
                }

            })

            
            .delete((req, res) => {

                db.query('SELECT * FROM car WHERE id = ?', [req.params.id], (err, result) => { // find then delete
                    if (err) {
                        res.json(error(err.message))
                    } else {

                        if (result[0] != undefined) {

                            db.query('DELETE FROM car WHERE id = ?', [req.params.id], (err, result) => {
                                if (err) {
                                    res.json(error(err.message))
                                } else {
                                    res.json(success(true))
                                }
                            })

                        } else {
                            res.json(error('Wrong id'))
                        }

                    }
                })

            })

        CarsRouter.route('/cars/')

            .get((req, res) => {

                    db.query('SELECT * from car', (err, result) => {
                        if (err) {
                            res.json(error(err.message));
                        } else {
                             res.json(success(result));
                        }
                    })

                })

             
            .post((req, res) => {

                if (req.body.model) {

                    db.query('SELECT * FROM car WHERE model = ? ', [req.body.model] ,(err, result) => {
                        if (err) {
                            res.json(error(err.message))
                        } else {

                            if (result[0] != undefined) {
                                res.json(error('name already taken')) // same like put
                            } else {

                                db.query('INSERT INTO car ( model, engine, currentLocation, numberOfDoors) VALUES (?,?,?,?)' , [req.body.model,req.body.engine,req.body.currentLocation,req.body.numberOfDoors] , (err, result) => {
                                    if (err) {
                                        console.log(err)
                                        res.json(error(err.message))
                                    } else {

                                        res.json(success(req.body.model +' '+'successfully added'))

                                    }
                                })

                            }

                        }
                    })

                } else {
                    res.json(error('no value'))
                }

            })
        CarsRouter.route('/users/:id') // CarsRouter is a variable which contain the route declared in config.json

            
            .get((req, res) => {

                db.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, result) => { // select from tabs all the data
                    if (err) {
                        res.json(error(err.message)) // in case there is an sql rror
                    } else {

                        if (result[0] != undefined) { // if it is not undefind it means we have data in database so we display the data
                            res.json(success(result[0]))
                        } else {
                            res.json(error('Wrong id')) // in case we put an id which is not in dtabase
                        }

                    }
                })

            })

            
            .put((req, res) => {

                if (req.body.name) {

                    db.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, result) => { // i tried first to find the id that I tested with in body
                        if (err) {
                            res.json(error(err.message))
                        } else {

                            if (result[0] != undefined) {

                                db.query('SELECT * FROM user WHERE name = ? AND id != ?', [req.body.name, req.params.id], (err, result) => { // try to find a name but with different id
                                    if (err) {
                                        res.json(error(err.message)) // in case error
                                    } else {

                                        if (result[0] != undefined) {
                                            res.json(error('same name')) // if I find I can not put the same name
                                        } else {

                                            db.query('UPDATE user SET name = ? , gender = ?, age =? WHERE id = ?', [req.body.name, req.body.gender,req.body.age, req.params.id], (err, result) => {
                                                if (err) {
                                                    res.json(error(err.message))
                                                } else {
                                                    res.json(success(true))
                                                }
                                            })

                                        }

                                    }
                                })

                            } else {
                                res.json(error('Wrong id'))
                            }

                        }
                    })

                } else {
                    res.json(error('no name value'))
                }

            })

            
            .delete((req, res) => {

                db.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, result) => { // find then delete
                    if (err) {
                        res.json(error(err.message))
                    } else {

                        if (result[0] != undefined) {

                            db.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, result) => {
                                if (err) {
                                    res.json(error(err.message))
                                } else {
                                    res.json(success(true))
                                }
                            })

                        } else {
                            res.json(error('Wrong id'))
                        }

                    }
                })

            })

        CarsRouter.route('/users/')

            .get((req, res) => {

                    db.query('SELECT * from user', (err, result) => {
                        if (err) {
                            res.json(error(err.message));
                        } else {
                             res.json(success(result));
                        }
                    })

                })

             
            .post((req, res) => {

                if (req.body.name) {

                    db.query('SELECT * FROM user WHERE name = ? ', [req.body.name] ,(err, result) => {
                        if (err) {
                            res.json(error(err.message))
                        } else {

                            if (result[0] != undefined) {
                                res.json(error('name already taken')) // same like put
                            } else {

                                db.query('INSERT INTO user ( name, gender, age) VALUES (?,?,?)' , [req.body.name,req.body.gender,req.body.age] , (err, result) => {
                                    if (err) {
                                        console.log(err)
                                        res.json(error(err.message))
                                    } else {

                                        res.json(success(req.body.name +' '+'successfully added'))

                                    }
                                })

                            }

                        }
                    })

                } else {
                    res.json(error('no value'))
                }

            })
   CarsRouter.route('/demanddetails/:carId/:userId') // CarsRouter is a variable which contain the route declared in config.json

            
            .get((req, res) => {

                db.query('SELECT * FROM demanddetails WHERE carId = ? and userId =?' , [req.params.carId,req.params.userId], (err, result) => { // select from tabs all the data
                    if (err) {
                        res.json(error(err.message)) // in case there is an sql rror
                    } else {

                        if (result[0] != undefined) { // if it is not undefind it means we have data in database so we display the data
                            res.json(success(result[0]))
                        } else {
                            res.json(error('Wrong id')) // in case we put an id which is not in dtabase
                        }

                    }
                })

            })

            
            .put((req, res) => {

                if (req.params.carId && req.params.userId) {

                    db.query('SELECT * FROM demanddetails WHERE carId =? and userId =?', [req.params.carId,req.params.userId], (err, result) => { // i tried first to find the id that I tested with in body
                        if (err) {
                            res.json(error(err.message))
                        } else {

                            if (result[0] != undefined) {

                                db.query('UPDATE demanddetails SET pickupEarliestTime = ? , pickupLocation = ?, dropoffLatestTie =?, dropoffLocation =? WHERE carId =? and userId =?', [req.body.pickupEarliestTime,req.body.pickupLocation,req.body.dropoffLatestTie,req.body.dropoffLocation, req.params.carId,req.params.userId], (err, result) => {
                                    if (err) {
                                        res.json(error(err.message))
                                    } else {
                                        res.json(success(true))
                                    }
                                })

                            } else {
                                res.json(error('Wrong id'))
                            }

                        }
                    })

                } else {
                    res.json(error('no name value'))
                }

            })

            
            .delete((req, res) => {

                db.query('SELECT * FROM demanddetails WHERE carId = ? and userId = ?', [req.params.carId,req.params.userId], (err, result) => { // find then delete
                    if (err) {
                        res.json(error(err.message))
                    } else {

                        if (result[0] != undefined) {

                            db.query('DELETE FROM demanddetails WHERE carId = ? and userId = ?', [req.params.carId,req.params.userId], (err, result) => {
                                if (err) {
                                    res.json(error(err.message))
                                } else {
                                    res.json(success(true))
                                }
                            })

                        } else {
                            res.json(error('Wrong id'))
                        }

                    }
                })

            })

        CarsRouter.route('/demanddetails/')

            .get((req, res) => {

                    db.query('SELECT * from demanddetails', (err, result) => {
                        if (err) {
                            res.json(error(err.message));
                        } else {
                             res.json(success(result));
                        }
                    })

                })

             
            .post((req, res) => {

                if (req.body.carId && req.body.userId) {

                    db.query('SELECT * FROM demanddetails WHERE carId = ? and userId =?' , [req.body.carId,req.body.userId] ,(err, result) => {
                        if (err) {
                            res.json(error(err.message))
                        } else {

                            if (result[0] != undefined) {
                                res.json(error('demandd already taken')) // same like put
                            } else {

                                db.query('INSERT INTO demanddetails ( carId, userId, pickupEarliestTime, pickupLocation, dropoffLatestTie, dropoffLocation) VALUES (?,?,?,?,?,?)' , [req.body.carId,req.body.userId,req.body.pickupEarliestTime,req.body.pickupLocation,req.body.dropoffLatestTie,req.body.dropoffLocation] , (err, result) => {
                                    if (err) {
                                        console.log(err)
                                        res.json(error(err.message))
                                    } else {

                                        res.json(success('successfully added'))

                                    }
                                })

                            }

                        }
                    })

                } else {
                    res.json(error('no value'))
                }

            })

        app.use(config.rootAPI, CarsRouter) // routeApi declared in config.json

        app.listen(config.port, () => console.log('Started on port '+config.port)) //port number I can change it in config.json

    }

})