var animals = []
var happiness = 0
var rewardCount = 0
//var koAlert = '<img  src="https://media.giphy.com/media/kYnoJzl8aBWIU/giphy.gif">'
var happinessElem = document.getElementById("happinessCount")
var rewardCountElem = document.getElementById("rewardCount")
var fatBtnElem = document.getElementById("fatBtn")
var lazyBtnElem = document.getElementById("lazyBtn")
var hungryBtnElem = document.getElementById("hungryBtn")
//var koAlertElem = document.getElementById("koAlert")

//animal variables
var dog1 = new Animal("Gentleman Bosco", "Loves Everything and Everyone in the world", "assets/photos/sir-bosco.jpg")
var dog2 = new Animal("Sire Fluffy Pants", "He may be small, but he's the king of his own domain", "assets/photos/sire-fluffy-pants.jpg")
var dog3 = new Animal("Moon Moon", "LOL, I can hear the rocks!", "assets/photos/moon-moon.jpg")

animals.push(dog1, dog2, dog3)

//Animal constructor object
function Animal(name, description, img) {
    this.name = name
    this.description = description
    this.happiness = 0
    this.img = img
    this.items = []
    //available items
}

//setActiveAnimal
function animalType(type, index){
    var animal = animals[index]
    if (type == "bosco"){
        drawAnimal(0)
    }
    if (type == "fluffyPants"){
        drawAnimal(1)
    }
    if (type == "moonMoon"){
        drawAnimal(2)
    }
}

//drawing the animals to the page funciton
function drawAnimal(index) {
    var template = ``
    var animalElem = document.getElementById("selectAnimal")
    for (let i = 0; i < animals.length; i++) {
        const animal = animals[index]
        template = `
        <span>
                <h1>${animal.name}</h1>
                <p>${animal.description}</p>
                <span id="koAlert" onchange="koAlert()">
                    <img class="dog-image" src="${animal.img}">
                </span>
        </span>
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
    fat: new Status("Fat", 1, "Fatness decreases treat satisfaction!!", false),
    lazy: new Status("Lazy", 5, "Honestly, who doesn't love belly rubs?", false),
    hungry: new Status("Hungry", -2, "Full Belly = Happiness Eternal", false)
}

//function to push a status from the global items object into the items array on the target animal
function giveStatus(type, index, status) {
    var animal = animals[index]  //passing the index of the array into this function. Without it the array isn't being referenced for these properties.
    if (type == "fat") {
        animal.items.push(statusMods.fat)
        fatBtnElem.disabled = true
    }
    if (type == "lazy") {
        animal.items.push(statusMods.lazy)
        lazyBtnElem.disabled = true
    }
    if (type == "hungry") {
        animal.items.push(statusMods.hungry)
        hungryBtnElem.disabled = true
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
    fatBtnElem.disabled = false
    lazyBtnElem.disabled = false
    hungryBtnElem.disabled = false
    rewardCounter()
    update(0)
}

update(0)
rewardCounter(0)
drawAnimal(0)