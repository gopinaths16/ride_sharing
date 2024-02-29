import User from "../model/user.js";
import Vehicle from "../model/vehicle.js";
import { condition_most_vacant, condition_preferred_vehicle } from "../helpers/constants.js";

export default class App {

    users = [];
    vehicles = [];
    rides = [];

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
                    this.mapVehicleToUser(username, vehicleName, vehicleNumber);
                }
            })
        }
    }

    offerRide = (rideOwner, origin, destination, availableSeats, vehicleName, vehicleNumber) => {
        if(this.checkIfUserExists(rideOwner)) {
            this.users.map((user) => {
                if(user._username === rideOwner) {
                    if(this.checkIfVechicleAlreadyMapped(rideOwner, vehicleName, vehicleNumber)) {
                        this.vehicles.map((vehicle) => {
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

    selectRide = (username, origin, destination, numberOfSeatsRequired, condition, vehicleName) => {
        if(this.checkIfUserExists(username)) {
            let rideSelected = undefined;
            if(this.userAlreadyOnRide(username)) {
                console.log("App :: selectRide :: User already on another ride");
                return;
            }
            let directRides = this.vehicles.filter((vehicle) => {
                return vehicle._ride._origin === origin && vehicle._ride._destination === destination && vehicle._ride._availableSeats > 0 ;
            });
            if(directRides.length > 0) {
                if(condition === condition_preferred_vehicle) {
                    rideSelected = directRides.filter((vehicle) => {
                        return vehicle._vehicleName === vehicleName;
                    })[0];
                } else if(condition === condition_most_vacant)  {
                    for(var i = 0;i < directRides.length;i++) {
                        if(rideSelected === undefined || rideSelected._ride._availableSeats < directRides[i]._ride._availableSeats)  {
                            rideSelected = directRides[i];
                        }
                    }
                }
            }
            if(rideSelected === undefined) {
                console.log("App :: selectRide :: Unable to select ride :: Route unavailable");
            } else {
                this.rides.push({
                    username: username,
                    rideSelected: rideSelected
                });
                this.users.map((user) => {
                    if(user._username === username) {
                        user.ridesTaken += 1;
                    } else if(user._username === rideSelected._username) {
                        user.ridesOffered += 1;
                    }
                });
                this.vehicles.map((vehicle) => {
                    if(vehicle._username === rideSelected._username && vehicle._vehicleName === rideSelected._vehicleName && vehicle._vehicleNumber === rideSelected._vehicleNumber) {
                        vehicle._ride._availableSeats -= 1;
                    }
                });
            } 
        } else {
            console.log("App :: selectRide :: invalid user");
        }
    }

    endRide = (username) => {
        if(this.checkIfUserExists(username)) {
            if(this.userAlreadyOnRide(username)) {
                let rideToEnd = this.rides.filter((ride) => {
                    return ride.username === username;
                });
                this.vehicles.map((vehicle) => {
                    if(vehicle._username === rideToEnd[0].rideSelected._username && vehicle._vehicleName === rideToEnd[0].rideSelected._vehicleName && vehicle._vehicleNumber === rideToEnd[0].rideSelected._vehicleNumber) {
                        vehicle._ride._availableSeats += 1;
                    }
                })
                this.rides = this.rides.filter((ride) => {
                    return ride.username != username;
                })
            } else {
                console.log("App :: endRide :: User currently not on a ride");
            }
        } else {
            console.log("App :: endRide :: Invalid user");
        }
    }

    mapVehicleToUser = (username, vehicleName, vehicleNumber) => {
        if(this.checkIfVechicleAlreadyMapped(vehicleName, vehicleNumber)) {
            console.log("User :: mapVechicleToUser :: Unable to map vechicle to user :: Vechicle already mapped");
        } else {
            this.vehicles.push(new Vehicle(username, vehicleName, vehicleNumber));
        }
    }

    checkIfVechicleAlreadyMapped = (username, vehicleName, vehicleNumber) => {
        let temp = this.vehicles.filter((vehicle) => {
            return vehicle._username === username && vehicle._vehicleName === vehicleName && vehicle._vehicleNumber === vehicleNumber; 
        });
        return temp.length > 0;
    }

    userAlreadyOnRide = (username) => {
        let temp = this.rides.filter((ride) => {
            return ride.username === username; 
        });
        return temp.length > 0;
    }

    checkIfUserExists = (username) => {
        let user = this.users.filter((user) => {
            return user._username === username;
        });
        return user.length > 0;
    }

    printRideStats = () => {
        console.log("********** Ride stats **********");
        this.users.map((user) => {
            console.log(user._username + ": " + user.ridesTaken + " Taken, " + user.ridesOffered + " Offered");
        })
    }

}