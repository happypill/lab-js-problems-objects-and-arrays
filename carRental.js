//custome object

var Customer = function (customerInfo) {
  this.id = customerInfo.id;
  this.name = customerInfo.name;
  this.carRented = null;
};

var Car = function (carInfo){
  this.id=carInfo.id;
  this.producer=carInfo.producer;
  this.model=carInfo.model;
  this.rentalPrice=carInfo.rentalPrice;
  this.available=true;
  this.customer=null;
  this.rentalDuration=0;

  this.quotePrice = function (rentalDuration){
    return this.rentalDuration * this.rentalPrice;
  };

  this.reserve=function(customer,rentalDuration){
      if(this.available){
        this.available=false;
        this.customer=customer;
        this.rentalDuration = rentalDuration;
        return true;

      }else{
        return false;
      }
  };

  this.return=function(){
      if(this.available){
        return "Sorry,this car have already been returned";
      }else{
        this.available=true;
        this.customer=null;
        this.rentalDuration=null;
      }
  }
};


// Vendor Object
var Vendor = function(name) {
  this.name = name;
  this.cars = [];
  this.customers = [];

  this.findCarIndex = function (carID) {
    return this.cars.findIndex(function(car){
      return car.id === carID ? true : false ;
    });
  };

  this.findCustomerIndex = function (customerID) {
    return this.customers.findIndex(function(customer){
      return customer.id === customerID ? true : false ;
    });
  };

  this.getCar = function (carID) {
    return this.cars.find(function(car){
      return car.id === carID ? true : false ;
    });
  };

  this.getCustomer = function (customerID) {
    return this.customers.find(function(customer){
      return customer.id === customerID ? true : false ;
    });
  };
  this.addCar = function(carObj){
    if (this.getCar(carObj)) {
      console.log("Car ID already exists");
    } else {
      this.cars.push(carObj);
      console.log("Car added to warehouse");
    }
  };
  this.addCustomer=function(customerObj)
  {
    if(this.getCustomer(customerObj)){
      console.log("Customer ID already exists");
    }else {
      this.customers.push(customerObj);
        console.log("Customer added to warehouse");
      }
  };

  this.removeCar = function (carID) {
    if (this.findCarIndex(carID) > -1) {
      this.cars.splice(carIndex, 1);
      console.log("Car deleted");
    } else {
      console.log( "The carID could not be found.");
    }
  };

  this.removeCustomer=function(customerID) {
      if(this.findCustomerIndex(customerID) > -1){
        this.customers.splice(customerID,1);
        console.log("Customer Deleted");
      }else{
         console.log("Customer not Found");
      }
  };
   this.availableCars = function() {
    return this.cars.filter(function(e) {return e.available === true; })
  }

  this.rentCar=function(customerID,rentalDuration){
    if(this.availableCars()===[]){
      console.log("All Cars have been rented");
    }
    else{
      var newCustomer = this.getCustomer(customerID);
      if(newCustomer){
          newCustomer.carRented = this.availableCars()[0];
        this.availableCars()[0].reserve(newCustomer, rentalDuration);
        console.log("The car has been reserved");
      } else {
        console.log("Please provide a valid customerID");
      }
    }
  };
  this.returnCar=function(customerID){
     var newCustomer = this.getCustomer(customerID);
    if(newCustomer){
      newCustomer.carRented.return();
      newCustomer.carRented=null;
      console.log("Thank you for using our service");
    }
    else{
      console.log("Please provide a valid customerID");
    }

  };
  this.totalRevenue = function() {
    return console.log('Total revenue is ' + this.cars.reduce(function(cost,currentCar) {
      return cost + currentCar.quotePrice();
    }, 0));
  }

 };


// Codes you can run to test your code
var customerInfo = {
  id: "001",
  name: "Sherman"
};


var customerA = new Customer(customerInfo);

var carInfo = {
  id: "001",
  producer: "Toyota",
  model: "Subra",
  rentalPrice: 200,
};


var carA = new Car(carInfo);


var vendor = new Vendor('Jens Limited');
vendor.addCustomer(customerA);


vendor.addCar(carA);

vendor.rentCar(customerA.id, 5);
console.log(vendor.availableCars());
vendor.rentCar(customerA.id, 5);
console.log(vendor.availableCars());
vendor.returnCar(customerA.id);
vendor.totalRevenue();
