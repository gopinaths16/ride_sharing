import Ride from "./ride.js";

export default class Vehicle {

    constructor(username, vehicleName, vehicleNumber) {
        this._username = username;
        this._vehicleName = vehicleName;
        this._vehicleNumber = vehicleNumber;
    }

    offerRide = (origin, destination, availableSeats) => {
        if(this._ride === undefined) {
            this._ride = new Ride(origin, destination, availableSeats);
        } else {
            console.log("Vehicle :: offerRide :: Unable to offer ride in this vehicle :: Ride already offered");
        }
    }

}