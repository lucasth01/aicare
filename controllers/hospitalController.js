const { hospitals } = require('./data')
const { client } = require('../config/connectdb')
const { v4: uuidv4 } = require('uuid')

const getAllHospitals = async (req, res) => {
    const query = `SELECT * FROM hospitals;`
    
    client.query(query, (err, result) => {
        if(err) {
            res.status(400).json({
                message: err.message
            })
        }

        const list = result.rows.map(row => ({
                id: row.id,
                hospitalName: row.name,
                lat: row.lat,
                long: row.long
            })
        )

        res.json({
            message: 'Succesfully retrieved all hospitals.',
            listStory: list
        })
    })
}

const addHospital = async (req, res) => {
    const { name, lat, long } = req.body

    try {
        if(!name || !lat || !long ) {
            throw new Error('Please fill all the fields.')
        }

        client.query(`SELECT * FROM hospitals WHERE lat=${lat} and long=${long}`, (err, result) => {
            if(result.rows.length === 1) {
                throw new Error('The hospital is already recorded.')
            }
        })

        const id = 'hospital-'+ uuidv4()

        client.query(`INSERT INTO hospitals VALUES (
            '${id}', '${name}', '${lat}','${long}')`, (err, result) => {
            if(err) {
                res.status(400).json({
                    message: err.message
                })
            }
            res.status(201).json({
                message: `New hospital ${name} successfully created!`,
            })
        })

    } catch(err) {
        res.status(400).json({
            message: err.message
        })
    }
}

module.exports = { getAllHospitals, addHospital }