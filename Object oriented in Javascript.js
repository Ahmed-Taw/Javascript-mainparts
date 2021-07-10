// ProtoTypal inhiretance is more simple than classical inhertance and it is simply 

/*
every object have a prototype property that have all inherted properties or methods from its parnent and 
every prototype could have another prototype till we reach Object prototype which is the base prototype in the prototype chain 

when we try to access any property or method in the object JS try to find it in the object and only if it is not exist we start look at the proto type and goes on 
in the proto type chain tell we find it.

*/
var personObj = {
    firstName : 'ahmed',
    lastName: 'Tawfik',
    getFullName: function(){
        return this.firstName + ' ' + this.lastName;
    }
}

var tawfik = {
    firstName : 'ahmed',
    lastName: 'Tawfik',
}

tawfik.__proto__ = personObj;

//now as tawfik proto set to personObj we can access getFullName function from tawfik object because it is exist in it's prototype.

for (const prop in tawfik) {
   // if (Object.hasOwnProperty.call(tawfik, prop)) {
        console.log(prop + ': ' + tawfik[prop]);
    //}
}



// -------------------------------
// Function constructor and new Key word 

/*
when we create a function that use this keyword and set variable to it taht is called function constructire 

because after we create it and use it with new key word the following happens 

new keyword create an empty object assign this keyword inside the function to it and invoke the function 
so the result is object with the setted vales.
*/ 

    function Person(firstName, lastName, age) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
            this.isAdult = function() { return this.age > 21; }
            }
      
 let tawfik = new Person('AHmed', 'Tawfik', 29);
 let sofia = new Person('Sofia', 'Cooper', 17);


 // Prototype with function constructors 
 /*
 any function has a prototype property which set to an empty object and this property used only when the function used as a function constructor 

 what new keyword does is make any new object point to the that empty object as it's prototype 
 which means if we added anything to this function protottype it will be automatically added for all objects created from this function 

 benfits :
    if we create alot of same objects and we have some functions we need for all of them instead of meake each object has the function we can set it in the prototype 
      this way all objects has access for it and only one instance from the function lives in prototype 

Warnings:
    when we set the protype of the function to a completely new object that means, old object created form the function will still point to the old prototype 
    and any new object created after we changed the prototype complelety will point to that new object.

 */

    Person.prototype.getFullName = function(){
        return this.firstName + ' ' + this.lastName;
    }

    // now any object will be creted from person will hacve access to getFullName 
 let tawfikWithFullName = new Person('Ahmed', 'Tawfik', 29);

 console.log(tawfikWithFullName.getFullName()); // that will log Ahmed Tawfik  because the function lives in prototype does that 

// Now if i changed the prototype completely 
 Person.prototype = { getFullName : function (){
    return this.lastName + ' ' + this.firstName;   // changed the format here 
  }
}

let sofiawithFullName = new Person('Sofia', 'Cooper', 17);

console.log(sofiawithFullName.getFullName()); // that will log Cooper Sofia  because the new object point to the new prototype which has the function with new format 

// but in the same time 

console.log(tawfikWithFullName.getFullName()); // that will log Ahmed Tawfik  because it still point to the old prototype which has  the function with old format  



///////////////// inhertanch //////////////////////////////

// here if we want student inherit from person and add som efunctionality  so we have 2 approaches 

// 1- if we just need the properties from person without caring about it's protoType 
function Student(firstName, lastName, age) {
      Person.call(this, firstName, lastName, age);
      this._enrolledCourses = [];
     
      this.enroll = function(courseId) { 
        this._enrolledCourses.push(courseId);
      };
     
      this.getCourses = function() {
        return this.fullName + "'s enrolled courses are: " +
          this._enrolledCourses.join(', ');
      };
    }

 let jim = new Student('Jim', 'Cooper', 29); // here we will create object and we will have first name and last name propeties form Person but our prototype will be Object prototype 
 // which means any functions existed in Person protoType will not be available here and to fix that we need to add 

 // 2- inhret object and it's prototype 
 Student.prototype = Object.create(Person.prototype); // object.create create empty object and add theobject in the arguments as aprototype to that object.
 Student.prototype.constructor = Student;

 console.log(jim);



 //////////////////////////////////// Other functions///////////////////

 // object.assign 

 //copy properties from alarguments to the first argument 

 var ahmed = {};

 Object.assign(ahmed, jim); // will result that all jim properties will be assigned to ahmed 
 // but remember it will be only properties not anything from prototype 

 // we can mergeer several properties as well by adding more arguments 

 // and to avoid modify the first object we can add it as empty object 

 Object.assign({}, jim, tawfikWithFullName);  // if all objects has same properties last object properties values will be taken.

 ////////////////////////////////Adding properties to the object /////////////////

 Object.defineProperty(jim, 'fullName', 
    {
      get: function() { 
        return this.firstName + ' ' + this.lastName;
      },
      set: function(value) { 
        var nameParts = value.split(' ');
        this.firstName = nameParts[0];
        this.lastName = nameParts[1];
      }
  
    });

 