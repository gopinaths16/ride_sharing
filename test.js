import App from "./service/app.js";

let app = new App();

app.addUser("Rohan", "M", "36"); 
app.addVechicle("Rohan", "Swift", "KA-01-12345");

app.addUser("Shashank", "M", "29"); 
app.addVechicle("Shashank", "Baleno", "TS-05-62395");

app.addUser("Nandini", "F", "29");

app.addUser("Shipra", "F", "27"); 
app.addVechicle("Shipra", "Polo", "KA-05-41491"); 
app.addVechicle("Shipra", "Activa", "KA-12-12332");

app.addUser("Gaurav", "M", "29");

app.addUser("Rahul", "M", "35"); 
app.addVechicle("Rahul", "XUV", "KA-05-1234");

app.offerRide("Rohan", "Hyderabad", "Bangalore", 1, "Swift", "KA-01-12345");
app.offerRide("Shipra", "Bangalore", "Mysore", 1, "Activa", "KA-12-12332");
app.offerRide("Shipra", "Bangalore", "Mysore", 2, "Polo", "KA-05-41491");
app.offerRide("Shashank", "Hyderabad", "Bangalore", 2, "Baleno", "TS-05-62395");
app.offerRide("Rahul", "Hyderabad", "Bangalore", 5, "XUV", "KA-05-1234");
app.offerRide("Rohan", "Bangalore", "Pune", 1, "Swift", "KA-01-12345");
