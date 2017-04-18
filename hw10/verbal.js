/* verbal part */
var state = "initial"
var slowBreathInc = 0.1
var fastBreathInc = 0.6
var slowTimeBetweenBlinks = 4000
var fastTimeBetweenBlinks = 500

// var audio1 = new Audio('audio/tick_laugh1.mp3');
// var audio2 = new Audio('audio/woohoo.mp3');


var jumping=false;
var tickling=false;



function startDictation() {

  if (window.hasOwnProperty('webkitSpeechRecognition')) {

    var recognition = new webkitSpeechRecognition();

    /* Nonverbal actions at the start of listening */
    setTimeBetweenBlinks(fastTimeBetweenBlinks);
    setBreathInc(slowBreathInc);

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.lang = "en-US";
    recognition.start();


    recognition.onresult = function(e) {
      document.getElementById('transcript').value
                               = e.results[0][0].transcript;
      var user_said = e.results[0][0].transcript;
      recognition.stop();

      /* Nonverbal actions at the end of listening */
      setTimeBetweenBlinks(slowTimeBetweenBlinks);
      jump(); //perform a nonverbal action from nonverbal.js

      var bot_response = decide_response(user_said)
      speak(bot_response)

      //`document.getElementById('labnol').submit();
    };

    recognition.onerror = function(e) {
      recognition.stop();
    }

  }
}


// function jump() {
//   if (!jumping) {
//     jumping = true;
//   }
//   tickling=false;
// }

// function tickle() {
//   if (!jumping) {
//     tickling = true;
//   }
// }

// function unfocus(){
//   jumping=false;
//   tickling=false;
// }

/* decide what to say.
 * input: transcription of what user said
 * output: what bot should say
 */
function decide_response(user_said) {
  var response;

  if (user_said.toLowerCase().includes("hello") || user_said.toLowerCase().includes("hi")) {
    audio6.play();
    response=" ";
  } else if ((user_said.toLowerCase().includes("bad") || user_said.toLowerCase().includes("terrible") || user_said.toLowerCase().includes("not good"))) {
    audio8.play();
     response=" ";
  } else if ((user_said.toLowerCase().includes("good") || user_said.toLowerCase().includes("nice") || user_said.toLowerCase().includes("wonderful"))) {
    audio7.play();
     response=" ";
  } else if (user_said.toLowerCase().includes("haha")) {
    audio10.play();
     response=" ";
  }else if (user_said.toLowerCase().includes("bye") || user_said.toLowerCase().includes("see you")) {
    audio11.play();
     response=" ";
  }  else {
    audio9.play();
     response=" ";
  }
  return response;
}

// function jumplaugh(){
//   if (jumping) {
//     audioArray[Math.floor(Math.random() * audioArray.length)].play();
//   }
// }

// function ticklelaugh(){
//   if(tickling){
//     audio1.play();
//     //audioArray[Math.floor(Math.random() * audioArray.length)].play();
//   }
// }
/* Load and print voices */
function printVoices() {
  // Fetch the available voices.
  var voices = speechSynthesis.getVoices();
  
  // Loop through each of the voices.
  voices.forEach(function(voice, i) {
        console.log(voice.name)
  });
}

printVoices();

/* 
 *speak out some text 
 */
function speak(text, callback) {

 /* Nonverbal actions at the start of robot's speaking */
  setBreathInc(fastBreathInc); 

  console.log("Voices: ")
  printVoices();

  var u = new SpeechSynthesisUtterance();
  u.text = text;
  u.lang = 'en-US';
  u.volume = 0.5 //between 0.1
  u.pitch = 1.3//between 0 and 2
  u.rate = 0.8 //between 0.1 and 5-ish
  u.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == "Google US English"; })[0]; //pick a voice

  u.onend = function () {
      
      /* Nonverbal actions at the end of robot's speaking */
      setBreathInc(slowBreathInc); 

      if (callback) {
          callback();
      }
  };

  u.onerror = function (e) {
      if (callback) {
          callback(e);
      }
  };

  speechSynthesis.speak(u);
}
