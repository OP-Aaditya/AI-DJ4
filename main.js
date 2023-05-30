scoreleftWrist = 0;
song_status = "";
death_note="";
down="";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload(){
    down=loadSound("down.mp3");
    death_note=loadSound("death_note.mp3");
}



function setup(){
    canvas= createCanvas( 600 , 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);

}
function modelLoaded(){
    console.log("poseNet is Initialized");
}

function gotPoses(results){
    if(results.lenght > 0){
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist = " + scoreleftWrist);

           leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
         console.log("LeftWrist X = " + leftWristX + " LeftWrist Y = " + leftWristY);
      

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWrist X = " + rightWristX + " RigthWrist Y = " + rightWristY);

    }
}

function draw(){
    image(video , 0 , 0 , 600 , 500);

     song_status= down.isPlaying();

    fill('#FF0000');
    stroke('#FF0000');

    if(scoreleftWrist > 0.2){
        circle(leftWristX , leftWristY , 20);
        death_note.stop();

        if( song_status == false){
            down.play();
            document.getElementById("play").innerHTML= " Playing - let me down slowly" ;
        }
    }
}