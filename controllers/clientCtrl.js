const Client = require('../models/clientModel');

class Features {
    // query === client.find()
    // queryString === req.query
    constructor(query, queryString) {
        this.query = query,
        this.queryString = queryString
    }

    filtring() {
        const queryObj = {...this.queryString}

        var queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(regex)\b/g, match => '$' + match)
        
        this.query.find(JSON.parse(queryStr))       

        return this
    }
}

const ClientCtrl = {
    getClient: async (req, res) => {
        try {
            const features = new Features(Client.find(), req.query).filtring()
            const client = await features.query
            return res.json(client)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createClient: async (req, res) => {
        try {
            const {name, counterNumber, factureDate, paymentDate, prevFigure, lastFigure } = req.body
            
            const client = await Client.findOne({ counterNumber: counterNumber })
            if(client) return res.status(400).json({ msg: 'This counter number is already exist!'})

            var dateObj = {
                'factureDate': factureDate,
                'paymentDate': paymentDate,
                'prevFigure': prevFigure,
                'lastFigure': lastFigure
            }

            const newClient = new Client({
                name: name,
                counterNumber: counterNumber,
                date: [dateObj]
            })

            await newClient.save()
            return res.json({ msg: 'Client added successfuly!!'})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateClient: async (req, res) => {
        try {
            const { counterNumber, factureDate, paymentDate, lastFigure } = req.body
            
            const client = await Client.findOne({ counterNumber: counterNumber })
            if(!client) return res.status(400).json({ msg: 'There is no client with this counter number!'})

            var dateObj = {
                'factureDate': factureDate,
                'paymentDate': paymentDate,
                'prevFigure': client.date[client.date.length - 1]['lastFigure'],
                'lastFigure': lastFigure
            }

            const updatedClient = await Client.findOneAndUpdate({ counterNumber: counterNumber }, {
                date: [
                    ...client.date, dateObj
                ]
            })
            return res.json({ msg: 'Client updated successfuly!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = ClientCtrl
