var animals = []
var happiness = 0
var rewardCount = 0
var happinessElem = document.getElementById("happinessCount")
var rewardCountElem = document.getElementById("rewardCount")

//Animal constructor object
function Animal(name, img) {
    this.name = name
    this.happiness = 0
    this.img = img
    this.items = []
    //available items
}


//setActiveAnimal

//animal variables
var dog = new Animal("Bosco", "assets/photos/dog-wagging-tail.jpg")
var cat = new Animal("Sire Fluffy Pants", "assets/photos/dog-wagging-tail.jpg")
var fish = new Animal("Miss Bubbles", "assets/photos/dog-wagging-tail.jpg")

animals.push(dog, cat, fish)

//reward function to determine the happiness increases.
function reward(type, index) {
    var animal = animals[index] //passing the index of the array into this function. Without it the array isn't being referenced for these properties.
    if (type == "earScratch") {
        animal.happiness += 1 + addMods(index)
    }
    if (type == "bellyRub") {
        animal.happiness += 5 + addMods(index)
    }
    if (type == "dogTreat") {
        animal.happiness += 10 + addMods(index)
    }
    rewardCounter(index)
    update(index)
}

//Status Modifier object
function Status(name, modifier, description) {
    this.name = name
    this.modifier = modifier
    this.description = description
    //this.enabled = enabled // this object will eventually be how I make sure that status can only be applied once. Figure out how to identify if it's been clicked before and disable further clicks.
}
//Status dictionary for status modifiers
var statusMods = {
    fat: new Status("Fat", 1, "Fatness decreases treat satisfaction!!"),
    lazy: new Status("Lazy", 5, "Honestly, who doesn't love belly rubs?"),
    hungry: new Status("Hungry", -2, "Full Belly = Happiness Eternal")
}

//function to push a status from the global items object into the items array on the target animal
function giveStatus(type, index) {
    var animal = animals[index] //passing the index of the array into this function. Without it the array isn't being referenced for these properties.
    if (type == "fat") {
        animal.items.push(statusMods.fat) //have to have the "statusMods.fat" so the funciton can access the global variable.
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
//total
//look at an animals items array
//for each item in the items array(using the .length ) add the modifier totoal
//return total modifiers



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

function reset(index){
    var animal = animals[index]
    animal.happiness = 0
    happinessCount = "Sad Dog"
    rewardCount = 0
}


update(0)
rewardCounter(0)
reset(0)