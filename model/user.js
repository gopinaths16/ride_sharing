import Vehicle from "./vehicle.js";

export default class User {

    vehiclesOwned = [];
    ridesTaken = 0;
    ridesOffered = 0;

    constructor(username, gender, age) {
        this._username = username;
        this._gender = gender;
        this._age = age;
    }

    mapVehicleToUser = (vehicleName, vehicleNumber) => {
        if(this.checkIfVechicleAlreadyMapped(vehicleName, vehicleNumber)) {
            console.log("User :: mapVechicleToUser :: Unable to map vechicle to user :: Vechicle already mapped");
        } else {
            this.vehiclesOwned.push(new Vehicle(vehicleName, vehicleNumber));
        }
    }

    checkIfVechicleAlreadyMapped = (vehicleName, vehicleNumber) => {
        let temp = this.vehiclesOwned.filter((vehicle) => {
            return vehicle._vehicleName === vehicleName && vehicle._vehicleNumber === vehicleNumber; 
        });
        return temp.length > 0;
    }
    
}