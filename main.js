// flash screan

document.querySelector(".control-buttons span").onclick = function () {
    // Ask For A Name
    let yourName = prompt("Enter your name :");

    // chec the name Value
    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = "UnKown";
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }

    // remove the Splash Screen
    document.querySelector(".control-buttons").remove();
};
window.localStorage.clear();
// ##################### main Variable #####################
// Effect Duration
let duration = 1000;
// select Blocks Container
let blocksContainer = document.querySelector(".memory-boxs-container");
// Select Blocks From Game
let blocks = Array.from(blocksContainer.children);
// Ceate Range Of keys
let orderRange = [...Array(blocks.length).keys()];
// console.log(orderRange)
shuffle(orderRange);
// console.log(orderRange)
// Add Order Css Proprty To Game Blocks
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    // Add Click Event
    block.addEventListener("click", function () {
        // Trigger The Flip Block Function
        flipBlock(block);
    });
});

// ######## -Flip Block Function- ########
function flipBlock(selectedBlock) {
    // Add class is-flipped
    selectedBlock.classList.add("is-flipped");

    // Collect All Filpped Cards
    let allFlipedBlocks = blocks.filter((flipedBlock) => flipedBlock.classList.contains("is-flipped"));

    // If Theres Two Selected Blocks
    if (allFlipedBlocks.length === 2) {
        // Stop Clicking Function
        stopClicking();

        // Check Matched Block Function
        checkMatchBlocks(allFlipedBlocks[0], allFlipedBlocks[1]);
    }
}

// ######## -Stop Clicking Function- ########

function stopClicking() {
    // Add Class [No Clicking] on main Container
    blocksContainer.classList.add("no-clicking");

    setTimeout(() => {
        // Remove Class [No Clicking] on main Container
        blocksContainer.classList.remove("no-clicking");
    }, duration);
}

// ######## -Check Matched Block Function- ########
function checkMatchBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector(".tries span");

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
        document.getElementById("success").play();
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
            document.getElementById("fail").play();
        }, duration);
    }
}
// ######## -Shuffle Function- ########
function shuffle(array) {
    // Settings Vars
    let current = array.length,
        temp,
        random;
    while (current > 0) {
        // Get Random Number
        random = Math.floor(Math.random() * current);

        // Decrears Length By One
        current--;
        // [1] Save Current Element in Stash
        temp = array[current];
        // [2] Current Element = Random Element
        array[current] = array[random];
        // [3] Random Element = Get Element From Stash
        array[random] = temp;
    }
    return array;
}
