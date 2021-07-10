// Objects and functions
// Create new object could be by using a new keyword 
var newobject = new Object();
newobject.firstName = 'ahmed';

// OR using object literals 
var newObject = {};
newObject.firstName = 'ahmed';

// Object literals VS JSON 
//it is almost the same but JSON properties have to be wrapped in quotes
// to convert data from one to other we can use 
JSON.stringify(newObject) // will convert newoBject to json string 
JSON.parse('{}') // will convert json to object 


//Functions 
// Javascript is a first class function language
// first class function means anything you can do with any tyoe class or string or anything you can do with functions 
//e.g. Assign them to variables, pass them around, create them on the fly 

// also function is an object which means it could be handled as object 
// like it could have properites from different types 
//(primitive , objects, even other functions)
// other properties which is exists by default in the function 
// Name: yes function has name but it is optional 
// Code: which is actually the code you wrote in the function 
//     so in relaty your code is attached to a function property named code and it is invocable ()

//Function statments VS function expression
// statment as adefination it is a piece of code which doesn't return a value 
// expression should return a value even if we didn't store it in a variable 

//function statment 
function greet(){
    console.log('hi');
}
// and in hoisting function statments fdefined in the beginning so it could be used ahed of it's definition line 

// function expression 
var anonymusFunc = function(){
    console.log('hi');
}
// that function expression will create a function and assign it to anonymusFunc variable which means before executing that line of code 
// anonymusFunc variable will be undefined based on hoisting and will be available as a function only after executing that line.

// This scope 
/*
inside any function this keyword pint to window object unless this function is a methid inside an object in this case when we use this keyword it points to the object 

and even inside object we have one wired scenario when we create a method and inside this method we create another function the new function this key word will point to the window object 

*/

function setGreetings(){
    this.greeting = 'hello';
};
setGreetings();
console.log(greeting) // result will be hello;

var greetingsObj = {
    englishGreeting: 'Hello',
    setSpanishGreeting: function (){
        this.spanishGreeting = 'Hola';
    }
}

console.log(greetingsObj.spanishGreeting) // will log undefined 
// but if we execte the setSpanish method and repeat it again 
greetingsObj.setSpanishGreeting();
console.log(greetingsObj.spanishGreeting) // will log Hola   because we added a new property to this which is point to greetingObj  object.

// Weired case with this inside methods 

    // correct implemntation but wrong result because of Javascript wired behaviour 
    var greetingsObj = {
        englishGreeting: 'Hello',
        setSpanishGreeting: function (){
            this.spanishGreeting = 'Hola';

            function setSpecialSpanishGreeting(){
                this.specialSpanishGreeting = 'Hola Hola';
            }
            // by calling this function here we expect that when we execute the parent method we will add 2 new properties 
            //1- spanishGreeting = 'Hola'
            //2- specialSpanishGreeting = 'Hola Hola'
            // but that will not happen because this scope will change to window object inside setSpecialSpanishGreeting so this property will be added to window object 
            setSpecialSpanishGreeting();
        }
    }
    greetingsObj.setSpanishGreeting();
    console.log(greetingsObj.spanishGreeting) // will log Hola   
    .console.log(greetingsObj.specialSpanishGreeting) // will log undefined because this scope will change    
// one solution for this problem is to take a reference to the object once we start the parent method and use that reference in any update or retrive data from the object.

var greetingsObj = {
    englishGreeting: 'Hello',
    setSpanishGreeting: function (){
        
        // assigning this to self variable here gurantee that anywhere we use self we will get a reference to greetingObj.
        var self = this;

        self.spanishGreeting = 'Hola';

        function setSpecialSpanishGreeting(){
            self.specialSpanishGreeting = 'Hola Hola';
        }
        // by calling this function here we expect that when we execute the parent method we will add 2 new properties 
        //1- spanishGreeting = 'Hola'
        //2- specialSpanishGreeting = 'Hola Hola'
        setSpecialSpanishGreeting();
    }
}
greetingsObj.setSpanishGreeting();
console.log(greetingsObj.spanishGreeting) // will log Hola   
console.log(greetingsObj.specialSpanishGreeting) // will log 'Hola Hola' because  we assigned this to self variable which will be point to greetingObj all the time.


// Arrays
/*
Array in javascript can be array of any thing it doesn't matter to have all elemnts from the same type

*/


// IIFE   Immidate Invoked Function Expression 
/*
it is a very usful feature in javascript which is enable us to write a function expression and invoke it in the same time that helps us in alot of things like 
1- execute any thing we need to run once the code started 
2- encapsulate any variables as it runs in it's own context so any modifications doesn't effect global context variables 

*/

(
    function(){
        var name = 'ahmed';
    console.log(name);  // will log ahmed because it is in it's scope
    }
)(); // because of this braits it will be immidatly invoked 

console.log(name) // if we tried to log name in global scope will not work 


// playing with this 
(
    function(){
        var name = 'ahmed';
    console.log(name); // will log ahmed because it is in it's scope
// return function(){
//     this.name = 'Tawfik';
//     console.log(name);
//     console.log(this);
// }    
}
)(); 


// Closure 
    // closure is when we have parent function which return other function that access varibale form parent variable.


    function  getChildFunctions(){
            var arr = [];
            for(var i = 0; i < 3; i++){
                arr.push(
                    function(){
                        console.log(i);
                    }
                )

            }
            return arr;
    }

    var children = getChildFunctions();
    children.forEach(f => {
        f(); // as we run every function which try to log i and i was defined in the parent scope we should be able to do that because of closure.
        // but here we should expect each function to log its number like   0 , 1, 2 
        // but the result is    3, 3, 3 
        // because all of them log i and last modifcation happened to i before parent function ends was increment i to qual 3 
    });


    // To Fix the Problem 
    function  getChildFunctions(){
        var arr = [];
        for(var i = 0; i < 3; i++){
            let j = i;
            arr.push(
                function(){
                    console.log(j);
                }
            )

        }
        return arr;
    }

    var children = getChildFunctions();
    children.forEach(f => {
    f(); // here each function to log its number like   0 , 1, 2 
    // because each of them log it's own variable  using let;
    });



// call apply bind 
// every function has access to a specific functions as below.
// all this functions helps to attach the function to aanother object 


var personObj = {
    firstName : 'ahmed',
    lastName: 'Tawfik',
    getFullName: function(){
        return this.firstName + ' ' + this.lastName;
    }
}

function logName(gretting){

    let localgreeting = gretting || 'hello';

    console.log(gretting + this.getFullName());  // as this function in global scope so this doesn't have a defination for getFullName funtion and for this function to work 
    // we need to attache this function to personObj 

}


logName("Hi")   // will throw error because this doesn't have getFullName

// to solve it.

var newLogName = logName.bind(personObj);   // bind return a new copy from the function binded with the object 
newLogName("Hi");


logName.call(personObj, "Hi");
logName.apply(personObj, ["Hi"]);


// Function borrowing 
 // when we have 2 object with same properties object can borrow a function form another object 
 var personObj = {
    firstName : 'ahmed',
    lastName: 'Tawfik',
    getFullName: function(){
        return this.firstName + ' ' + this.lastName;
    }
}

var personObj2 = {
    firstName : 'ahmed',
    lastName: 'Tawfik',
    
}

personObj.getFullName.apply(personObj2); // that will invoke getFullName but using properties of object2 ;

// Function currying
 // create a copy from a function with preset parameters 
 function multiplyFunction(a,b){
     return a*b;
 }

 var presetedParametersMultiple = multiplyFunction.bind(this, 2); // will create a copy from multiply function with always a set to 2 and only need to pass b 
 



