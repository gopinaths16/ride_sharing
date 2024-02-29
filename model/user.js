export default class User {

    ridesTaken = 0;
    ridesOffered = 0;

    constructor(username, gender, age) {
        this._username = username;
        this._gender = gender;
        this._age = age;
    }

}