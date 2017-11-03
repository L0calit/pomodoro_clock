var break_length = 5;
var session_length = 25;
var premier = true;
var minutes = 25;
var secondes = 1;
var evenem = "Session";
var current = false;

$(document).ready(function() {
        $("#moinsB").click(function(){
            if (premier) {
                if (break_length > 1) {
                    break_length --;
                    document.getElementById("break_length").innerHTML = break_length;
                } else {
                    alert("Break length can't be below 1.");
                }
            }
        });
        $("#plusB").click(function(){
            if (premier) {
                if (break_length < 100) {
                    break_length ++;
                    document.getElementById("break_length").innerHTML = break_length;
                } else {
                    alert("Break length can't be higher than 100 minutes long.")
                }
            }
        });
        $("#moinsS").click(function(){
            if (premier) {
                if (session_length > 1) {
                    session_length --;
                    document.getElementById("session_length").innerHTML = session_length;
                } else {
                    alert("Session length can't be below 1.");
                }
            }
        });
        $("#plusS").click(function(){
            if (premier) {
                if (session_length < 100) {
                    session_length ++;
                    document.getElementById("session_length").innerHTML = session_length;
                } else {
                    alert("Session length can't be higher than 100 minutes long.")
                }
            }
        });

    $("#montre").click(function(){
        Chrono();
    });
});

function Chrono() {
    if (current) {
        current = false;
        document.getElementById("start").innerHTML = "<br><br><br>Start";
    } else {
        current = true;
        document.getElementById("start").innerHTML = "<br><br><br>Pause";
        if (premier) {
            if (evenem == "Session") {
                minutes = session_length;
            } else {
                minutes = break_length;
            }
            premier = false;
        }
        ChangerTemps();
    }
}

function ChangerTemps() {
    if (current) {
        if (secondes > 0) {
            secondes--;
        } else {
            minutes--;
            secondes = 59;
        }
        if (evenem == "Session") {
            var pourcentage = ((minutes*60+secondes)/ (session_length * 60) * 100) + "%";
        } else {
            var pourcentage = ((minutes*60+secondes)/ (break_length * 60) * 100) + "%";
        }
        document.getElementById("start").style.height = pourcentage;
        document.getElementById("text").innerHTML = evenem + "<br>" + minutes + ":" + secondes;
        if (secondes == 0 && minutes == 0) {
            if (evenem == "Session") {
                alert("Tu peux prendre une pause");
                minutes = break_length;
                evenem = "Break";
                document.getElementById("start").style.background = "red";
                ChangerTemps();
            } else {
                evenem = "Session";
                secondes = 1;
                current = false;
                document.getElementById("start").style.background = "green";
                document.getElementById("start").style.height = "100%";
                document.getElementById("text").innerHTML = "";
                alert("Tu as finie ton pomodoro");
                premier = true;
            }
        } else {
            setTimeout(ChangerTemps, 1000);
        }
    }
}
