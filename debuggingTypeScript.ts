
// 1. Setting types
var myString: string;
// I can assign myString like this:
myString = "Bee stinger";
// Why is there a problem with this? What can I do to fix this?
//myString = 9; --> Errors in code: Type 'number' is not assignable to type 'string'.
myString = "Moo!";
//Comment how I fixed:
// myString was defined as string, then 9 was assigned to it. Therefore a number was assigned into string variable.


// 2. Setting the types of function parameters
function sayHello(name: string){
   return `Hello, ${name}!`;
}
 // This is working great:
console.log(sayHello("Kermit"));
 // Why isn't this working? I want it to return "Hello, 9!"
//console.log(sayHello(9)); --> Errors in code: Argument of type 'number' is not assignable to parameter of type 'string'.
console.log(sayHello("Hi!"));
//Comment how I fixed:
// sayHello function is expecting a string not a number as "9", it only accepts strings as parameter.


// 3. Optional parameters
function fullName(firstName: string, lastName: string, middleName?: string){
   let fullName = `${firstName} ${middleName} ${lastName}`;
   return fullName;
}
// This works:
console.log(fullName("Mary", "Moore", "Tyler"));
// What do I do if someone doesn't have a middle name?
//console.log(fullName("Jimbo", "Jones")); --> Errors in code: Expected 3 arguments, but got 2.
console.log(fullName("Jimbo", "Jones"));
//Comment how I fixed:
// A validation can be added to check if there is middleName, if there is not middleName we could set arguments in the function to avoid error.


//  4. Interfaces and function parameters
interface Student {
   firstName: string;
   lastName: string;
   belts: number;
}
function graduate(ninja: Student){
   return `Congratulations, ${ninja.firstName} ${ninja.lastName}, you earned ${ninja.belts} belts!`;
}
const christine = {
   firstName: "Christine",
   lastName: "Yang",
   belts: 2
}
const jay = {
   firstName: "Jay",
   lastName: "Patel",
   /*belt: 4  -> Errors in code:
   Argument of type '{ firstName: string; lastName: string; belt: number; }' is not assignable to parameter of type 'Student'.
   Property 'belts' is missing in type '{ firstName: string; lastName: string; belt: number; }' but required in type 'Student'.*/
   belts: 4
}
// This seems to work fine:
console.log(graduate(christine));
// This one has problems:
console.log(graduate(jay));
//Comment how I fixed:
//In the  interface was declared "belts" not "belt" as it is in the const jay.


// 5. Classes and function parameters
class Ninja {
   fullName: string;
   constructor(
      public firstName: string,
      public lastName: string){
         this.fullName = `${firstName} ${lastName}`;
      }
   debug(){
      console.log("Console.log() is my friend.")
   }
}
// This is not making an instance of Ninja, for some reason:
//const shane = Ninja();
/* --> Error in code#2: Value of type 'typeof Ninja' is not callable. Did you mean to include 'new'? */
//Comment how I fixed:
//Since the class Ninja constructor was not used properly, it could not be invoked, see it adjusted in next line.
const shane = new Ninja("Alan", "Turing")

// Since I'm having trouble making an instance of Ninja, I decided to do this:
const turing = {
   fullName: "Alan Turing",
   firstName: "Alan",
   lastName: "Turing"
}
 // Now I'll make a study function, which is a lot like our graduate function from above:
function study(programmer: Ninja){
   return `Ready to whiteboard an algorithm, ${programmer.fullName}?`
}
// Now this has problems:
//console.log(study(turing)); 
/*--> Error in code#2: Argument of type '{ fullName: string; firstName: string; lastName: string; }' is not assignable to parameter of type 'Ninja'.
Property 'debug' is missing in type '{ fullName: string; firstName: string; lastName: string; }' but required in type 'Ninja'.*/
//Comment how I fixed:
//Since const "turing" is not an instance of Ninja, study function is not working. To solve it, Ninja constructor need to be adjusted
//in order to generate the the instance of class Ninja and use is as parameter in study.
console.log(study(shane));


//  6. Arrow functions
//var increment = x => x + 1;
var increment = (x:number) => x + 1;
// This works great:
console.log(increment(3));
//var square = x => {x * x};
var square = (x:number) => x * x;
// This is not showing me what I want:
console.log(square(4));
// This is not working:
//var multiply = x,y => x * y;
var multiply = (x:number,y:number) => x * y;
// Nor is this working:
//var math = (x, y) => let sum = x + y;
var math = (x:number, y:number) => { 
   let sum = x + y;
   let product = x * y;
   let difference = Math.abs(x-y);
   return [sum, product, difference];
}
/*Errors in code:
Parameter 'x' implicitly has an 'any' type.
Parameter 'x' implicitly has an 'any' type.
Cannot find name 'x'.
Cannot find name 'x'.
Object is possibly 'undefined'.
Parameter 'x' implicitly has an 'any' type.
Parameter 'y' implicitly has an 'any' type.
Cannot find name 'let'.
Cannot find name 'x'.
Cannot find name 'x'.
Object is possibly 'undefined'.
Cannot find name 'x'.
Object is possibly 'undefined'.
';' expected.
',' expected.
'x' is declared but its value is never read.
'y' is declared but its value is never read. */
//Comment how I fixed:
//x and y variables needed to be set as type number, also some parenthesis were added. Finally, a couple curly braces
//were added in the math arrow function.

// 7. Arrow functions and 'this'
class Elephant {
   constructor(public age: number){}
   //birthday = () => function(){  --> Errors in code: 'this' implicitly has type 'any' because it does not have a type annotation.
      birthday = ()=>{  
      this.age++;  
   }
}
const babar = new Elephant(8);
setTimeout(babar.birthday, 1000)
setTimeout(function(){
   console.log(`Babar's age is ${babar.age}.`)
   }, 2000)
 // Why didn't babar's age change? Fix this by using an arrow function in the Elephant class.
//Comment how I fixed:
//Arrow function structure were added and it fixed the issue.