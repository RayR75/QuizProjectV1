let x = 0;
// print 10 random numbers between 1 and 10
while (x < 10) {
  console.log(Math.floor(Math.random()*9) + 1);
  x++;
}
let timeLeft = -1;
let currentQuestion = 0;
let score = 0;
let timer; // this will be the timer function
let numHintsLeft = 2; // allows user to see 2 hints
let questions = [
   {
	"question": "1. What is actually electricity?",
	"a": "A flow of water",
	"b": "A flow of air",
	"c": "A flow of electrons",
	"d": "A flow of atoms",
	"image":"quizimages/q1.jpg",
	"answer": "c",
	"hint": "Electron"
   },
   {
	"question": "2. Which of the following is not an international organisation?",
	"a": "FIFA",
	"b": "NATO",
	"c": "ASEAN",
	"d": "FBI",
	"image":"quizimages/q2.png",
	"answer": "d",
	"hint": "Federal Bureau of Investigation"
   },
   {
	"question": "3. What is the speed of sound?",
	"a": "120 km/h",
	"b": "1,200 km/h",
	"c": "400 km/h",
	"d": "700 km/h",
	"image":"quizimages/q3.jpg",
	"answer": "b",
	"hint": "More than 1,000 km/h"
   },
   {
	"question": "4. Which is the easiest way to tell the age of many trees?",
	"a": "To measure the width of the tree",
	"b": "To count the rings on the trunk",
	"c": "To count the number of leaves",
	"d": "To measure the height of the tree",
	"image":"quizimages/q4.jpg",
	"answer": "b",
	"hint": "Rings"
   },
   {
	"question": "5. What was the first country to use tanks in combat during World War I?",
	"a": "France",
	"b": "Japan",
	"c": "Britain",
	"d": "Germany",
	"image":"quizimages/q5.jpg",
	"answer": "c",
	"hint": "United Kingdom"
   },
   {
	"question": "6. What is the main component of the sun?",
	"a": "Liquid lava",
	"b": "Gas",
	"c": "Molten iron",
	"d": "Rock",
	"image":"quizimages/q6.jpg",
	"answer": "b",
	"hint": "Not solid and liquid"
   },
   {
	"question": "7. Which of the following animals can run the fastest?",
	"a": "Cheetah",
	"b": "Leopard",
	"c": "Tiger",
	"d": "Lion",
	"image":"quizimages/q7.jpg",
	"answer": "a",
	"hint": "Have distinctive spots and black"
   },
   {
	"question": "8. In the United States, football is called soccer. So what is American football called in the United Kingdom?",
	"a": "Rugby",
	"b": "American football",
	"c": "Handball",
	"d": "Combball",
	"image":"quizimages/q8.jpg",
	"answer": "b",
	"hint": "American football"
   },
   {
	"question": "9. Which football club does Kevin De Bruyne play for?",
	"a": "Liverpool",
	"b": "Manchester City",
	"c": "Tottenham Hotspur",
	"d": "Chelsea",
	"image":"quizimages/q9.png",
	"answer": "b",
	"hint": "The football club in Manchester"
   },
   {
	"question": "10. The two biggest exporters of beers in Europe are Germany and …",
	"a": "Spain",
	"b": "France",
	"c": "Italy",
	"d": "Belgium",
	"image":"quizimages/q10.jpg",
	"answer": "d",
	"hint": "The capital city is Brussels"
   },
 ];
 
 
 function loadQuestion() {
	 
	 // if a timer is running from previous question, stop it
	 if (timeLeft >= 0) {
		 clearInterval(timer);
	 }
     
    // close light box for first question
    if (currentQuestion == 0) {
       closeLightBox();
    }
     
    // load the image
    let img = document.getElementById("image");
    img.src = questions[currentQuestion].image;
    img.style.maxWidth = "70vh";
	img.style.maxHeight = "80vh";
    
    // load the question and answers
    document.getElementById("question").innerHTML = questions[currentQuestion].question;
    document.getElementById("a").innerHTML = "A. " + questions[currentQuestion].a;
    document.getElementById("b").innerHTML = "B. " + questions[currentQuestion].b;
    document.getElementById("c").innerHTML = "C. " + questions[currentQuestion].c;
    document.getElementById("d").innerHTML = "D. " + questions[currentQuestion].d;
 } // loadQuestion
 
 
 function markIt(ans) {
     
    let message = "";
    
    if (ans == questions[currentQuestion].answer) {
        
       // add 1 to score
       score++;
       
       // display score 
       document.getElementById("score").innerHTML = score + " / " + questions.length;
       
       message = "Correct!!!! Your score is " + score + " / " + questions.length;
    } else {
       message = "Incorrect :< Your score is " + score + " / " + questions.length; 
    } // else
        
   
    
    // move to the next question
    currentQuestion++;
    if (currentQuestion >= questions.length) {
       // create a special message
       message = "Congratulations!!!You have been crowned the Quiz";
    } else {
       loadQuestion();
    }
    
    // show the lightbox
    document.getElementById("lightbox").style.display = "block";
    document.getElementById("message").innerHTML = message;
  
 }  // markIt
 
 function closeLightBox() {
    document.getElementById("lightbox").style.display = "none";
	
	// if a new question is loaded, start timer whenlightbox closes
	if (currentQuestion < questions.length - 1) {
		console.log("just closed lightbox and about to start timer");
		startTimer();
	}
 } // closeLightbox
 
 // start the timer for the current question
 function startTimer() {
	 timeLeft = 20; // seconds
	  console.log("timer " + timeLeft);
	 timer = setInterval( function(){
		 console.log("timer " + timeLeft);
		 document.getElementById("countdown").innerHTML = timeLeft;
		 timeLeft--;
		 
		 if (timeLeft <= 0) { 
			 clearInterval(timer);
			 
			 
			 // show lightbox
			 message = "Time over. Moving to next question";
			 document.getElementById("lightbox").style.display = "block";
			 document.getElementById("message").innerHTML = message;
			 currentQuestion++;
			 loadQuestion();
		 }
 
	 
		 
		 
	 }, 1000);
 }	/// startTimer
 
 function showHint() {
	 let message = "";
	 
	 if (numHintsLeft > 0) {
	 // get hint from currentQuestion
	 message = questions[currentQuestion].hint;
	 numHintsLeft--; // substact 1 from numHitsLeft
	 } else {
		 message = "sorry, all your hints have been used up.";
	 } // else
	 
	 // unhide lightbox displaying
	 document.getElementById("lightbox").style.display = "block";
     document.getElementById("message").innerHTML = message;
	 
	 
 } // showHint
 
 
 
 
 
 
 
 
   
