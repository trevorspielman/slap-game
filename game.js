var animals = []
var happiness = 0
var rewardCount = 0
//var koAlert = '<img  src="https://media.giphy.com/media/kYnoJzl8aBWIU/giphy.gif">'
var happinessElem = document.getElementById("happinessCount")
var rewardCountElem = document.getElementById("rewardCount")
//var koAlertElem = document.getElementById("koAlert")

//animal variables
var dog = new Animal("Bosco", "assets/photos/sir-bosco.jpg")
var cat = new Animal("Sire Fluffy Pants", "assets/photos/dog-wagging-tail.jpg")
//var fish = new Animal("Miss Bubbles", "assets/photos/dog-wagging-tail.jpg")

animals.push(dog)

//Animal constructor object
function Animal(name, img) {
    this.name = name
    this.happiness = 0
    this.img = img
    this.items = []
    //available items
}

//setActiveAnimal
function animalType(type, index){
    var animal = animals[index]
    if (type == "bosco"){
        drawAnimal(animal.cat)
    }
}
//function
//for and if statements to determine dog type

function drawAnimal(index) {
    var template = ``
    var animalElem = document.getElementById("selectAnimal")
    for (let i = 0; i < animals.length; i++) {
        const animal = animals[index]
        template += `
        <div class="col-sm-4">
                <h1>${animal.name}</h1>
                <span id="koAlert" onchange="koAlert()">
                    <img class="dog-image" src="${animal.img}">
                </span>
            </div>
        `
    }
    animalElem.innerHTML = template
}

//reward function to determine the happiness increases.
function reward(type, index) {
    var animal = animals[index] //passing the index of the array into this function. Without it the array isn't being referenced for these properties.
    if (type == "earScratch") {
        animal.happiness += 1 + addMods(index)
    }
    if (type == "bellyRub") {
        animal.happiness += 5 + addMods(index)
    }
    if (type == "fetch") {
        animal.happiness += 10 + addMods(index)
    }
    rewardCounter(index)
    update(index)
}

//Status Modifier object
function Status(name, modifier, description, enabled) {
    this.name = name
    this.modifier = modifier
    this.description = description
    this.enabled = enabled // this object will eventually be how I make sure that status can only be applied once. Figure out how to identify if it's been clicked before and disable further clicks.
}

//Status dictionary for status modifiers
var statusMods = {
    fat: new Status("Fat", 1, "Fatness decreases treat satisfaction!!", true),
    lazy: new Status("Lazy", 5, "Honestly, who doesn't love belly rubs?", true),
    hungry: new Status("Hungry", -2, "Full Belly = Happiness Eternal", true)
}

//function to push a status from the global items object into the items array on the target animal
function giveStatus(type, index, status) {
    var animal = animals[index]  //passing the index of the array into this function. Without it the array isn't being referenced for these properties.
    if (type == "fat") {
        animal.items.push(statusMods.fat)
    } //have to have the "statusMods.fat" so the funciton can access the global variable.
    if (!animal.items.includes(statusMods.fat)) {
        statusMods.fat.enabled = false //works to disable button after one click
    }
    if (type == "lazy") {
        animal.items.push(statusMods.lazy)
    }
    if (type == "hungry") {
        animal.items.push(statusMods.hungry)
    }
    update(index)
}

//modifying the damage function
function addMods(index) {
    var animal = animals[index] //aliasing like we did above to open the box to accept the Animals Array
    var total = 0 //holder variable
    for (var i = 0; i < animal.items.length; i++) { // for the length of the array on items (How many items are applied)
        var item = animal.items[i]
        total += item.modifier //totalling up the impact the items will have on the value of each reward
    }
    return total
}

// update function to update the happiness level
function update(index) {
    var animal = animals[index]
    happinessElem.innerText = animal.happiness
}

//reward counter function. Keeps the items from increasing the reward counter.
function rewardCounter(index) {
    var animal = animals[index]
    rewardCountElem.innerText = rewardCount++
}

/* function koAlert(index){
    var animal = animals[index]
    if(happiness >= 100){
        koAlertElem.innerHTML = koAlert
        return koAlert
    }
} */

function reset(index) {
    var animal = animals[index]
    for (let i = 0; i < animals.length; i++) {
        const animal = animals[index];
        rewardCount = 0
        animal.happiness = 0
        animal.items = []
        happinessElem.innerText = animal.happiness
    }
    rewardCounter()
    update(0)
}

update(0)
rewardCounter(0)
drawAnimal(0)