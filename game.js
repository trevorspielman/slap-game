var animals = []
var happiness = 0
var rewardCount = 0
var happinessElem = document.getElementById("happinessCount")
var rewardCountElem = document.getElementById("rewardCount")
var statusElem = document.getElementById("selectedStatus")

//animal variables
var dog1 = new Animal("Gentleman Bosco", "Loves Everything and Everyone in the world", "assets/photos/sir-bosco.jpg")
var dog2 = new Animal("Sire Fluffy Pants", "He may be small, but he's the king of his own domain", "assets/photos/sire-fluffy-pants.jpg")
var dog3 = new Animal("Moon Moon", "LOL, I can hear the rocks!", "assets/photos/moon-moon.jpg")

animals.push(dog1, dog2, dog3)

//Status dictionary for status modifiers
var statusMods = {
    fat: new Status("Fat", 2, "Full Belly = Happiness Eternal", false),
    lazy: new Status("Lazy", 5, "Honestly, who doesn't love belly rubs?", false),
    hungry: new Status("Hungry", -5, "Ever heard of 'hangry'?", false)
}

//Animal constructor object
function Animal(name, description, img) {
    this.name = name
    this.description = description
    this.happiness = 0
    this.img = img
    this.items = []
}

//Status Modifier object
function Status(name, modifier, description) {
    this.name = name
    this.modifier = modifier
    this.description = description
}

//setActiveAnimal
function animalType(name) {
    if (name == "bosco") {
        drawAnimal(0)
    }
    if (name == "fluffyPants") {
        drawAnimal(1)
    }
    if (name == "moonMoon") {
        drawAnimal(2)
    }
}

//drawing the animals to the page funciton
function drawAnimal(index) {
    var template = ``
    var animalElem = document.getElementById("selectedAnimal")
    for (let i = 0; i < animals.length; i++) {
        const animal = animals[index]
        template = `
        <span>
                <h1>${animal.name}</h1>
                <p>${animal.description}</p>
                <span>
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
    if (animal.happiness < 0) {
        animal.happiness = 0
    }
    if (animal.happiness >= 100) {
        animal.happiness = 100
        var animalElem = document.getElementById("selectedAnimal")
        animalElem.innerHTML = `<span>
            <h1>HAPPINESS OVERLOAD!!!!</h1>
                <p>The tail started wagging so fast the dog became a helicopter!!!</p>
                    <img class="dog-image" src="assets/photos/helicopter-dog.gif">
                </span>`
    }
    rewardCounter(index)
    update(index)
}


//function to push a status from the global items object into the items array on the target animal
function giveStatus(type, index) {
    var animal = animals[index]
    for (let i = 0; i < animals.length; i++) {
        const animal = animals[index];  //passing the index of the array into this function. Without it the array isn't being referenced for these properties.
        if (animal.items.includes(statusMods[type])) {
            animal.items = []
            statusElem.innerHTML = ``
        } else {
            animal.items.push(statusMods[type])
            drawStatus(type)
        }
        update(index)
    }
}

function drawStatus(type) {
    var statusTemplate = ``
    for (let i = 0; i < animals.length; i++) {
        const statusMod = statusMods[type]
        statusTemplate = `
        <span>
                <h3>${statusMod.name}</h3>
                <p>${statusMod.description}</p>
                <p>${statusMod.modifier} happiness point modifier</p>
        </span>
        `
    }
    statusElem.innerHTML = statusTemplate
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

function reset(index) {
    var animal = animals[index]
    for (let i = 0; i < animals.length; i++) {
        const animal = animals[index];
        rewardCount = 0
        animal.happiness = 0
        animal.items = []
        happinessElem.innerText = animal.happiness
        statusElem.innerHTML = ``
    }
    rewardCounter()
    update(0)
    drawAnimal(index)
}

update(0)
rewardCounter(0)
drawAnimal(0)