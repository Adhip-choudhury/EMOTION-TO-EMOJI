var prediction_1="";
var prediction_2="";
Webcam.set({
    width:350,
    height:300,   
  
    image_format : 'png',
    png_quality:90
  });

  camera = document.getElementById("camera");

Webcam.attach('#camera');

      
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}


console.log("ML5 VERSION ", ml5.version);

var classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/_0WR5IUzw/model.json", modelloaded);

function modelloaded(){
    console.log("model loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    var data_1="the first prediction is "+prediction_1;
    var data_2="And the Second prediction is "+prediction_2;
    var say=new SpeechSynthesisUtterance(data_1+data_2);
    synth.speak(say);
}

function check(){
    var img_clicked=document.getElementById("captured_image");
    classifier.classify(img_clicked, gotReult);
}

function gotReult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(prediction_1 == "Happy"){
        document.getElementById("update_emoji").innerHTML="&#128512;";
        }
         
        if(prediction_1 == "Angry"){
            document.getElementById("update_emoji").innerHTML="&#128545;";
            }

            
        if(prediction_1 == "Sad"){
            document.getElementById("update_emoji").innerHTML="&#128532;;";
            }

            
        if(prediction_2 == "Happy"){
            document.getElementById("update_emoji2").innerHTML="&#128512;";
            }
             
            if(prediction_2 == "Angry"){
                document.getElementById("update_emoji2").innerHTML="&#128545;";
                }
    
                
            if(prediction_2 == "Sad"){
                document.getElementById("update_emoji2").innerHTML="&#128532;;";
                }
    }
}