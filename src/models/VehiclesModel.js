const mongoose = require('../database/indexDatabase')

const VehiclesSchema = new mongoose.Schema({
    vehicleName: String,
    vehicleImage: String   
    
})

const Vehicles = mongoose.model('Vehicles', VehiclesSchema);

module.exports = Vehicles;