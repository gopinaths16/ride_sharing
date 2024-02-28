import User from "../model/user.js";

export default class App {

    users = [];

    addUser = (username, gender, age) => {
        if(this.checkIfUserExists(username)) {
            console.log("App :: addUser() :: Unable to add user :: User already exists!");
        } else {
            this.users.push(new User(username, gender, age));
        }
    }

    addVechicle = (username, vehicleName, vehicleNumber) => {
        if(this.checkIfUserExists(username)) {
            this.users.map((user) => {
                if(user._username === username) {
                    user.mapVehicleToUser(vehicleName, vehicleNumber);
                }
            })
        }
    }

    offerRide = (rideOwner, origin, destination, availableSeats, vehicleName, vehicleNumber) => {
        if(this.checkIfUserExists(rideOwner)) {
            this.users.map((user) => {
                if(user._username === rideOwner) {
                    if(user.checkIfVechicleAlreadyMapped(vehicleName, vehicleNumber)) {
                        user.vehiclesOwned.map((vehicle) => {
                            if(vehicle._vehicleName === vehicleName && vehicle._vehicleNumber === vehicleNumber) {
                                vehicle.offerRide(origin, destination, availableSeats);
                            }
                        });
                    } else {
                        console.log("App :: offerRide :: Unable to offer ride :: Invalid vehicle details");
                    }
                }
            })
        } else {
            console.log("App :: offerRide :: Unable to offer ride :: Invalid user");
        }
    }

    checkIfUserExists = (username) => {
        let user = this.users.filter((user) => {
            return user._username === username;
        });
        return user.length > 0;
    }

    printUsers = () => {
        console.log(this.users);
    }

}