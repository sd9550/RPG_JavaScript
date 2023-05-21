var playerName = "";
var playerClass = "";
var playerMaxHealth = 0;
var playerMaxMana = 0;
var playerHealth = 0;
var playerMana = 0;
var currIndex = 0;

const classList = {
    Warrior: "Warrior",
    Mage: "Mage",
    Thief: "Thief"
}

const enemyList = ["Slime", "Bat"];
const enemyHealth = 30;
// initial values for each class
const startingHealth = ["100", "60", "80"];
const startingMana = ["50", "100", "80"];

const backgroundColor = ["green", "black", "brown", "yellow"];
const currentZone = ["forest", "cave", "swamp", "desert"];

const zoneText = "You are currently in a ";

// load the character list 
$(document).ready(function() {
    $.each(classList, function(val, text) {
        $('#clist').append( new Option(text,val) );
    })
    $("#errorName").hide();
    $("#adventureForm").hide();
    $("#battleBox").hide();
});

function characterCreate() {
    playerName = $("#cname").val();
    // check if the input is empty
    if(playerName.length < 1) {
        $("#errorName").show();
    } else {
        var listIndex = $("#clist").index();
        playerClass = $("#clist").val();

        playerMaxHealth = startingHealth[listIndex];
        playerMaxMana = startingMana[listIndex];
        playerHealth = playerMaxHealth;
        playerMana = playerMaxMana;

        console.log(playerName + " " + playerClass + " " + listIndex);

        startGame();
    }
    
}

function startGame() {
    $("#createCharacterForm").hide();
    $("#main-header").text("Adventuring");
    $("body").css("background-color", backgroundColor[0]);
    $("#zoneText").text(zoneText + currentZone[currIndex]);

    setStatus();
    $("#adventureForm").show();
}

function setStatus() {
    $("#playerName").text("Name: " + playerName);
    $("#playerClass").text("Class: " + playerClass);
    $("#playerHealth").text("Health: " + playerHealth + "/" + playerMaxHealth);
    $("#playerMana").text("Mana: " + playerMana + "/" + playerMaxMana);
}

function searchArea() {
    var num = Math.floor(Math.random() * 4);
    var searchOptions = ["You found nothing.", "You thought you saw something but it was nothing.", "You found a cool looking rock. It does nothing though.", "You encountered an enemy."]
    if (num < 3) {
        $("#adventureText").text(searchOptions[num]);
    } else {
        startBattle();
    }
    
    console.log(searchOptions[num]);
}

function restHere() {
    $("#adventureText").text("You rest for a few hours and recover your health/mana.");
    playerHealth = playerMaxHealth;
    playerMana = playerMaxMana;
}

function moveOn() {
    currIndex = Math.floor(Math.random() * 4);
    $("#zoneText").text(zoneText + currentZone[currIndex]);
    $("body").css("background-color", backgroundColor[currIndex]);

}

function startBattle() {
    var num = Math.floor(Math.random() * 2);
    var enemyHP = enemyHealth;

    $("#adventureBox").hide();
    $("#battleBox").show();
    $("#main-header").text("Battle");
    $("#enemyName").text("A wild " + enemyList[num] + " has appeared!");
    $("enemyHealth").text("Enemy Health: " + enemyHP + "/" + enemyHealth);
}

function runAway() {
    $("#main-header").text("Adventuring");
    $("#adventureBox").show();
    $("#battleBox").hide();
}