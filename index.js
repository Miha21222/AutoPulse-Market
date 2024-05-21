const express = require('express')
const exphb = require('express-handlebars')
const mysql = require('mysql')


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'cars',
    port: '3307'
})

connection.connect((err) => {
    if (err) throw err
    console.log('Connection successful!');
})

const query = 'SELECT * FROM buy';
var storage = []

connection.query(query, function (error, results, fields) {
    if (error) throw error
    let r = JSON.parse(JSON.stringify(results))
    storage = r
})

const app = express()

const hbs = exphb.create({
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set("view engine", "hbs")
app.set('views', 'views')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('hello', {
        data: storage[0].id
    })
})

var names = []
var prices = []

function inject() {
    for (i = 0; i < storage.length; i++) {
        names[i] = storage[i].manufacturer + ' ' + storage[i].model + ' ' + storage[i].year
        prices[i] = '$' + storage[i].price
    }
}

setTimeout(() => {
    inject()
    console.log(names)
}, 50);

app.get('/buy', (req, res) => {
    res.render('buy', {
        cars: {
            name1: names[0],
            price1: prices[0],

            name2: names[1],
            price2: prices[1],

            name3: names[2],
            price3: prices[2],

            name4: names[3],
            price4: prices[3],

            name5: names[4],
            price5: prices[4],

            name6: names[5],
            price6: prices[5],

            name7: names[6],
            price7: prices[6],

            name8: names[7],
            price8: prices[7],
        },
    })
})

const query2 = 'SELECT * FROM sell';
var storage2 = []

connection.query(query2, function (error, results, fields) {
    if (error) throw error
    let b = JSON.parse(JSON.stringify(results))
    storage2 = b
})

var id2 = []
var names2 = []
var models2 = []
var years2 = []
var prices2 = []

function inject2() {
    for (i = 0; i < storage2.length; i++) {
        id2[i] = storage2[i].id
        names2[i] = storage2[i].manufacturer
        models2[i] = storage2[i].model
        years2[i] = storage2[i].year
        prices2[i] = '$' + storage2[i].price
    }
}

setTimeout(() => {
    inject2()
    console.log(id2, names2[2])
}, 50);


const urlencodedParser = express.urlencoded({ extended: false });

app.post('/sell/:dynamic', urlencodedParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);

    if (!req.params.dynamic) res.send('ERROR: no dynamic part')

    else if (req.params.dynamic === 'insert') {
        const query = 'INSERT INTO `sell`(`manufacturer`, `model`, `year`, `price`) VALUES ?';
        var values = [
            [req.body.carManufacturer, req.body.carModel, req.body.carYear, req.body.carPrice]
        ];

        connection.query(query, [values], function (error, results) {
            if (error) throw error;
            console.log("Number of records inserted: " + results.affectedRows);
        })
    } else if (req.params.dynamic === 'delete') {
        const query = 'DELETE FROM `sell` WHERE `sell`.`id` = ?';
        var values = [
            [req.body.carID]
        ];

        connection.query(query, [values], function (error, results) {
            if (error) throw error;
            console.log("Number of records deleted: " + results.affectedRows);
        })
    } else if (req.params.dynamic === 'edit') {
        const query = 'UPDATE `sell` SET `manufacturer` = ?, `model` = ?, `year` = ?, `price` = ? WHERE `id` = ?';
        const values = [
            req.body.carManufacturer,
            req.body.carModel,
            req.body.carYear,
            req.body.carPrice,
            req.body.carID
        ];

        connection.query(query, values, function (error, results) {
            if (error) throw error;
            console.log("Number of records deleted: " + results.affectedRows);
        })
    } else if (req.params.dynamic === 'search') {
        const query = 'SELECT * FROM `sell` WHERE `sell`.`manufacturer` = ?';
        var values = [
            req.body.carManufacturer
        ];
        var storage3 = []

        connection.query(query, values, function (error, results) {
            if (error) throw error;
            let c = JSON.parse(JSON.stringify(results))
            storage3 = c

            var id3 = []
            var names3 = []
            var models3 = []
            var years3 = []
            var prices3 = []

            function inject3() {
                for (i = 0; i < storage3.length; i++) {
                    id3[i] = storage3[i].id
                    names3[i] = storage3[i].manufacturer
                    models3[i] = storage3[i].model
                    years3[i] = storage3[i].year
                    prices3[i] = '$' + storage3[i].price
                }
            }

            setTimeout(() => {
                inject3()
                console.log(id3, names3)
            }, 50);

            setTimeout(() => {
                res.render('sell_search', {
                    cars: {
                        id1: id3[0],
                        name1: names3[0],
                        model1: models3[0],
                        year1: years3[0],
                        price1: prices3[0],

                        id2: id3[1],
                        name2: names3[1],
                        model2: models3[1],
                        year2: years3[1],
                        price2: prices3[1],

                        id3: id3[2],
                        name3: names3[2],
                        model3: models3[2],
                        year3: years3[2],
                        price3: prices3[2],

                        id4: id3[3],
                        name4: names3[3],
                        model4: models3[3],
                        year4: years3[3],
                        price4: prices3[3],

                        id5: id3[4],
                        name5: names3[4],
                        model5: models3[4],
                        year5: years3[4],
                        price5: prices3[4],

                        id6: id3[5],
                        name6: names3[5],
                        model6: models3[5],
                        year6: years3[5],
                        price6: prices3[5],

                        id7: id3[6],
                        name7: names3[6],
                        model7: models3[6],
                        year7: years3[6],
                        price7: prices3[6],

                        id8: id3[7],
                        name8: names3[7],
                        model8: models3[7],
                        year8: years3[7],
                        price8: prices3[7],

                        id9: id3[8],
                        name9: names3[8],
                        model9: models3[8],
                        year9: years3[8],
                        price9: prices3[8],

                        id10: id3[9],
                        name10: names3[9],
                        model10: models3[9],
                        year10: years3[9],
                        price10: prices3[9],

                        id11: id3[10],
                        name11: names3[10],
                        model11: models3[10],
                        year11: years3[10],
                        price11: prices3[10],

                        id12: id3[11],
                        name12: names3[11],
                        model12: models3[11],
                        year12: years3[11],
                        price12: prices3[11],

                        id13: id3[12],
                        name13: names3[12],
                        model13: models3[12],
                        year13: years3[12],
                        price13: prices3[12],

                        id14: id3[13],
                        name14: names3[13],
                        model14: models3[13],
                        year14: years3[13],
                        price14: prices3[13],

                        id15: id3[14],
                        name15: names3[14],
                        model15: models3[14],
                        year15: years3[14],
                        price15: prices3[14],

                        id16: id3[15],
                        name16: names3[15],
                        model16: models3[15],
                        year16: years3[15],
                        price16: prices3[15],

                        id17: id3[16],
                        name17: names3[16],
                        model17: models3[16],
                        year17: years3[16],
                        price17: prices3[16],

                        id18: id3[17],
                        name18: names3[17],
                        model18: models3[17],
                        year18: years3[17],
                        price18: prices3[17],

                        id19: id3[18],
                        name19: names3[18],
                        model19: models3[18],
                        year19: years3[18],
                        price19: prices3[18],

                        id20: id3[19],
                        name20: names3[19],
                        model20: models3[19],
                        year20: years3[19],
                        price20: prices3[19],

                        id21: id3[20],
                        name21: names3[20],
                        model21: models3[20],
                        year21: years3[20],
                        price21: prices3[20],

                        id22: id3[21],
                        name22: names3[21],
                        model22: models3[21],
                        year22: years3[21],
                        price22: prices3[21],

                        id23: id3[22],
                        name23: names3[22],
                        model23: models3[22],
                        year23: years3[22],
                        price23: prices3[22],

                        id24: id3[23],
                        name24: names3[23],
                        model24: models3[23],
                        year24: years3[23],
                        price24: prices3[23],
                    },
                })
            }, 100);

            console.log("Number of records deleted: " + results.affectedRows);
        })
    } else if (req.params.dynamic === 'pFilter') {
        const query = 'SELECT * FROM `sell` WHERE `price` < ? AND `price` > ?';
        var values = [
            req.body.priceMax,
            req.body.priceMin
        ];
        var storage3 = []

        connection.query(query, values, function (error, results) {
            if (error) throw error;
            let c = JSON.parse(JSON.stringify(results))
            storage3 = c

            var id3 = []
            var names3 = []
            var models3 = []
            var years3 = []
            var prices3 = []

            function inject3() {
                for (i = 0; i < storage3.length; i++) {
                    id3[i] = storage3[i].id
                    names3[i] = storage3[i].manufacturer
                    models3[i] = storage3[i].model
                    years3[i] = storage3[i].year
                    prices3[i] = '$' + storage3[i].price
                }
            }

            setTimeout(() => {
                inject3()
                console.log(id3[0], names3)
            }, 50);

            setTimeout(() => {
                res.render('sell_search', {
                    cars: {
                        id1: id3[0],
                        name1: names3[0],
                        model1: models3[0],
                        year1: years3[0],
                        price1: prices3[0],

                        id2: id3[1],
                        name2: names3[1],
                        model2: models3[1],
                        year2: years3[1],
                        price2: prices3[1],

                        id3: id3[2],
                        name3: names3[2],
                        model3: models3[2],
                        year3: years3[2],
                        price3: prices3[2],

                        id4: id3[3],
                        name4: names3[3],
                        model4: models3[3],
                        year4: years3[3],
                        price4: prices3[3],

                        id5: id3[4],
                        name5: names3[4],
                        model5: models3[4],
                        year5: years3[4],
                        price5: prices3[4],

                        id6: id3[5],
                        name6: names3[5],
                        model6: models3[5],
                        year6: years3[5],
                        price6: prices3[5],

                        id7: id3[6],
                        name7: names3[6],
                        model7: models3[6],
                        year7: years3[6],
                        price7: prices3[6],

                        id8: id3[7],
                        name8: names3[7],
                        model8: models3[7],
                        year8: years3[7],
                        price8: prices3[7],

                        id9: id3[8],
                        name9: names3[8],
                        model9: models3[8],
                        year9: years3[8],
                        price9: prices3[8],

                        id10: id3[9],
                        name10: names3[9],
                        model10: models3[9],
                        year10: years3[9],
                        price10: prices3[9],

                        id11: id3[10],
                        name11: names3[10],
                        model11: models3[10],
                        year11: years3[10],
                        price11: prices3[10],

                        id12: id3[11],
                        name12: names3[11],
                        model12: models3[11],
                        year12: years3[11],
                        price12: prices3[11],

                        id13: id3[12],
                        name13: names3[12],
                        model13: models3[12],
                        year13: years3[12],
                        price13: prices3[12],

                        id14: id3[13],
                        name14: names3[13],
                        model14: models3[13],
                        year14: years3[13],
                        price14: prices3[13],

                        id15: id3[14],
                        name15: names3[14],
                        model15: models3[14],
                        year15: years3[14],
                        price15: prices3[14],

                        id16: id3[15],
                        name16: names3[15],
                        model16: models3[15],
                        year16: years3[15],
                        price16: prices3[15],

                        id17: id3[16],
                        name17: names3[16],
                        model17: models3[16],
                        year17: years3[16],
                        price17: prices3[16],

                        id18: id3[17],
                        name18: names3[17],
                        model18: models3[17],
                        year18: years3[17],
                        price18: prices3[17],

                        id19: id3[18],
                        name19: names3[18],
                        model19: models3[18],
                        year19: years3[18],
                        price19: prices3[18],

                        id20: id3[19],
                        name20: names3[19],
                        model20: models3[19],
                        year20: years3[19],
                        price20: prices3[19],

                        id21: id3[20],
                        name21: names3[20],
                        model21: models3[20],
                        year21: years3[20],
                        price21: prices3[20],

                        id22: id3[21],
                        name22: names3[21],
                        model22: models3[21],
                        year22: years3[21],
                        price22: prices3[21],

                        id23: id3[22],
                        name23: names3[22],
                        model23: models3[22],
                        year23: years3[22],
                        price23: prices3[22],

                        id24: id3[23],
                        name24: names3[23],
                        model24: models3[23],
                        year24: years3[23],
                        price24: prices3[23],
                    },
                })
            }, 100);

            console.log("Number of records deleted: " + results.affectedRows);
        })
    } else if (req.params.dynamic === 'yFilter') {
        const query = 'SELECT * FROM `sell` WHERE `year` < ? AND `year` > ?';
        var values = [
            req.body.yearMax,
            req.body.yearMin
        ];
        var storage3 = []

        connection.query(query, values, function (error, results) {
            if (error) throw error;
            let c = JSON.parse(JSON.stringify(results))
            storage3 = c

            var id3 = []
            var names3 = []
            var models3 = []
            var years3 = []
            var prices3 = []

            function inject3() {
                for (i = 0; i < storage3.length; i++) {
                    id3[i] = storage3[i].id
                    names3[i] = storage3[i].manufacturer
                    models3[i] = storage3[i].model
                    years3[i] = storage3[i].year
                    prices3[i] = '$' + storage3[i].price
                }
            }

            setTimeout(() => {
                inject3()
                console.log(id3[0], names3)
            }, 50);

            setTimeout(() => {
                res.render('sell_search', {
                    cars: {
                        id1: id3[0],
                        name1: names3[0],
                        model1: models3[0],
                        year1: years3[0],
                        price1: prices3[0],

                        id2: id3[1],
                        name2: names3[1],
                        model2: models3[1],
                        year2: years3[1],
                        price2: prices3[1],

                        id3: id3[2],
                        name3: names3[2],
                        model3: models3[2],
                        year3: years3[2],
                        price3: prices3[2],

                        id4: id3[3],
                        name4: names3[3],
                        model4: models3[3],
                        year4: years3[3],
                        price4: prices3[3],

                        id5: id3[4],
                        name5: names3[4],
                        model5: models3[4],
                        year5: years3[4],
                        price5: prices3[4],

                        id6: id3[5],
                        name6: names3[5],
                        model6: models3[5],
                        year6: years3[5],
                        price6: prices3[5],

                        id7: id3[6],
                        name7: names3[6],
                        model7: models3[6],
                        year7: years3[6],
                        price7: prices3[6],

                        id8: id3[7],
                        name8: names3[7],
                        model8: models3[7],
                        year8: years3[7],
                        price8: prices3[7],

                        id9: id3[8],
                        name9: names3[8],
                        model9: models3[8],
                        year9: years3[8],
                        price9: prices3[8],

                        id10: id3[9],
                        name10: names3[9],
                        model10: models3[9],
                        year10: years3[9],
                        price10: prices3[9],

                        id11: id3[10],
                        name11: names3[10],
                        model11: models3[10],
                        year11: years3[10],
                        price11: prices3[10],

                        id12: id3[11],
                        name12: names3[11],
                        model12: models3[11],
                        year12: years3[11],
                        price12: prices3[11],

                        id13: id3[12],
                        name13: names3[12],
                        model13: models3[12],
                        year13: years3[12],
                        price13: prices3[12],

                        id14: id3[13],
                        name14: names3[13],
                        model14: models3[13],
                        year14: years3[13],
                        price14: prices3[13],

                        id15: id3[14],
                        name15: names3[14],
                        model15: models3[14],
                        year15: years3[14],
                        price15: prices3[14],

                        id16: id3[15],
                        name16: names3[15],
                        model16: models3[15],
                        year16: years3[15],
                        price16: prices3[15],

                        id17: id3[16],
                        name17: names3[16],
                        model17: models3[16],
                        year17: years3[16],
                        price17: prices3[16],

                        id18: id3[17],
                        name18: names3[17],
                        model18: models3[17],
                        year18: years3[17],
                        price18: prices3[17],

                        id19: id3[18],
                        name19: names3[18],
                        model19: models3[18],
                        year19: years3[18],
                        price19: prices3[18],

                        id20: id3[19],
                        name20: names3[19],
                        model20: models3[19],
                        year20: years3[19],
                        price20: prices3[19],

                        id21: id3[20],
                        name21: names3[20],
                        model21: models3[20],
                        year21: years3[20],
                        price21: prices3[20],

                        id22: id3[21],
                        name22: names3[21],
                        model22: models3[21],
                        year22: years3[21],
                        price22: prices3[21],

                        id23: id3[22],
                        name23: names3[22],
                        model23: models3[22],
                        year23: years3[22],
                        price23: prices3[22],

                        id24: id3[23],
                        name24: names3[23],
                        model24: models3[23],
                        year24: years3[23],
                        price24: prices3[23],
                    },
                })
            }, 100);

            console.log("Number of records deleted: " + results.affectedRows);
        })
    }
    else {
        res.send('Unknown dynamic part')
    }
})

app.get('/sell', (req, res) => {
    res.render('sell', {
        cars: {
            id1: id2[0],
            name1: names2[0],
            model1: models2[0],
            year1: years2[0],
            price1: prices2[0],

            id2: id2[1],
            name2: names2[1],
            model2: models2[1],
            year2: years2[1],
            price2: prices2[1],

            id3: id2[2],
            name3: names2[2],
            model3: models2[2],
            year3: years2[2],
            price3: prices2[2],

            id4: id2[3],
            name4: names2[3],
            model4: models2[3],
            year4: years2[3],
            price4: prices2[3],

            id5: id2[4],
            name5: names2[4],
            model5: models2[4],
            year5: years2[4],
            price5: prices2[4],

            id6: id2[5],
            name6: names2[5],
            model6: models2[5],
            year6: years2[5],
            price6: prices2[5],

            id7: id2[6],
            name7: names2[6],
            model7: models2[6],
            year7: years2[6],
            price7: prices2[6],

            id8: id2[7],
            name8: names2[7],
            model8: models2[7],
            year8: years2[7],
            price8: prices2[7],

            id9: id2[8],
            name9: names2[8],
            model9: models2[8],
            year9: years2[8],
            price9: prices2[8],

            id10: id2[9],
            name10: names2[9],
            model10: models2[9],
            year10: years2[9],
            price10: prices2[9],

            id11: id2[10],
            name11: names2[10],
            model11: models2[10],
            year11: years2[10],
            price11: prices2[10],

            id12: id2[11],
            name12: names2[11],
            model12: models2[11],
            year12: years2[11],
            price12: prices2[11],

            id13: id2[12],
            name13: names2[12],
            model13: models2[12],
            year13: years2[12],
            price13: prices2[12],

            id14: id2[13],
            name14: names2[13],
            model14: models2[13],
            year14: years2[13],
            price14: prices2[13],

            id15: id2[14],
            name15: names2[14],
            model15: models2[14],
            year15: years2[14],
            price15: prices2[14],

            id16: id2[15],
            name16: names2[15],
            model16: models2[15],
            year16: years2[15],
            price16: prices2[15],

            id17: id2[16],
            name17: names2[16],
            model17: models2[16],
            year17: years2[16],
            price17: prices2[16],

            id18: id2[17],
            name18: names2[17],
            model18: models2[17],
            year18: years2[17],
            price18: prices2[17],

            id19: id2[18],
            name19: names2[18],
            model19: models2[18],
            year19: years2[18],
            price19: prices2[18],

            id20: id2[19],
            name20: names2[19],
            model20: models2[19],
            year20: years2[19],
            price20: prices2[19],

            id21: id2[20],
            name21: names2[20],
            model21: models2[20],
            year21: years2[20],
            price21: prices2[20],

            id22: id2[21],
            name22: names2[21],
            model22: models2[21],
            year22: years2[21],
            price22: prices2[21],

            id23: id2[22],
            name23: names2[22],
            model23: models2[22],
            year23: years2[22],
            price23: prices2[22],

            id24: id2[23],
            name24: names2[23],
            model24: models2[23],
            year24: years2[23],
            price24: prices2[23],
        },
    })
})

const query4 = 'SELECT * FROM managers';
var storage4 = []

connection.query(query4, function (error, results, fields) {
    if (error) throw error
    let d = JSON.parse(JSON.stringify(results))
    storage4 = d
})

var id4 = []
var names4 = []
var phone = []

function inject4() {
    for (i = 0; i < storage4.length; i++) {
        id4[i] = storage4[i].id
        names4[i] = storage4[i].firstName + ' ' + storage4[i].secondName
        phone[i] = storage4[i].phone
    }
}

setTimeout(() => {
    inject4()
    console.log(id4, names4)
}, 50);

app.get('/info', (req, res) => {
    res.render('info', {

        userPhone1: names4[0],
        userName1: phone[0],

        userPhone2: names4[1],
        userName2: phone[1],

        userPhone3: names4[2],
        userName3: phone[2],

        userPhone4: names4[3],
        userName4: phone[3],

    })
})




const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})