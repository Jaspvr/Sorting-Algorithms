//VARIABLES
//Get from user
var new_array = document.getElementById("new_array_btn");
var sort_btn = document.getElementById("sort_btn");
var bars_container = document.getElementById("bars_container");
var select_algo = document.getElementById("algo");
var speed = document.getElementById("speed");
var slider = document.getElementById("slider");

//variables for user values
var minRange = 1;
var maxRange = slider.value;
var numOfBars = slider.value;
var heightFactor = 4;
var speedFactor = 100;
var unsorted_array = new Array(numOfBars);

//get the algorithm selected by the user
var algo = "";
sort_btn.addEventListener("click", function () {
  if (algo === "selection") {
    selectionSort(unsorted_array);
  } else if (algo === "insertion") {
    insertionSort(unsorted_array);
  } else if (algo === "heap") {
    heapSort(unsorted_array);
  } else if (algo === "bubble") {
    bubbleSort(unsorted_array);
  } else if (algo === "merge") {
      mergeSort(unsorted_array);
  } else if (algo === "quick") {
    quickSort(unsorted_array, 0, unsorted_array.length - 1);
  } else {
    bubbleSort(unsorted_array);
  }
})

//EVENT LISTENERS:
//take slider input of number of items in array and maximum height of a bar
slider.addEventListener("input", function () {
  numOfBars = slider.value;
  maxRange = slider.value;
  bars_container.innerHTML = "";
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

//take in speed asked by user
speed.addEventListener("change", (e) => {
  speedFactor = parseInt(e.target.value);
});

//take in the algorithm selected, "change" because selected by user
select_algo.addEventListener("change", function () {
  algo = select_algo.value;
});

//load in the array as bars
document.addEventListener("DOMContentLoaded", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

//generate a new array
new_array.addEventListener("click", function () {
  unsorted_array = createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
});


//FUNCTIONS TO AID EVENTS AND ALGORITHMS:
//to add a delay
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//creates the set of bars on the screen
function renderBars(array) {
  //for each bar
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    //add a CSS component to bars for colouring and height changing
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    //add this 
    bars_container.appendChild(bar);
  }
}

//To fill colour in bars after they go green/red during swaps
function fillBars(exclude1, exclude2){
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < bars.length; i++) {
    if(i != exclude1 || i!= exclude2){
      bars[i].style.backgroundColor = "black";
    }
  }
}

//random array to be made into bars
function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
  }

  return array;
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//SORTING ALGORITHMS
async function selectionSort(array){
    let bars = document.getElementsByClassName("bar");
    //int placeHolder;
    var minElement;
    var count = 0;
  
    while(count+1<array.length){
        minElement = array[count+1];
        //find min element
        var minElementIndex = count+1;
        for(var i = count+1; i<array.length; i++){
            if(array[i] < minElement){
                minElement = array[i];
                minElementIndex = i;
            }
        }
        //swap place holder and smallest element if it smallest element is smaller
        var placeHolder = array[count];
        if(placeHolder > minElement){
          fillBars(-1, -1);
          array[count] = minElement;
          array[minElementIndex] = placeHolder;
          //give the current bars coloour and update their height on the screen
          bars[count].style.height = array[count] * heightFactor + "px";
          bars[count].style.backgroundColor = "lightgreen";
          bars[minElementIndex].style.height = array[minElementIndex] * heightFactor + "px";
          bars[minElementIndex].style.backgroundColor = "lightgreen";
          //delay
          await sleep(speedFactor);
        }
        
        count++;
    }
    fillBars(-1, -1);
    return array;
  }
  
async function insertionSort(array){
    let bars = document.getElementsByClassName("bar");
    var firstIndex;
    var secondIndex = 1;
    var tempValue;
    //move through the array until the end
    while(secondIndex < array.length){
      tempValue = array[secondIndex];
      firstIndex = secondIndex -1;
      //only the firstIndex is being updated so dont use secondIndex for any
      //keep swapping back until in order by moving the previous one ahead
      while(firstIndex >= 0 && tempValue < array[firstIndex]){
          array[firstIndex+1] = array[firstIndex];
          
          //give the current bars coloour and update their height on the screen
          bars[firstIndex+1].style.height = array[firstIndex+1] * heightFactor + "px";
          bars[firstIndex + 1].style.backgroundColor = "lightgreen";
          //delay
          await sleep(speedFactor);
  
          //update colour of all bars, (lightgreen to black)
          for (let k = 0; k < bars.length; k++) {
            if (k != firstIndex + 1) {
              bars[k].style.backgroundColor = "black";
            }
          }
        firstIndex--;
  
      }
      //since we kept the original second index now we can update it to the correct place
      array[firstIndex+1] = tempValue;
      bars[firstIndex + 1].style.height = array[firstIndex + 1] * heightFactor + "px";
      secondIndex++;
    }
    //update colour of all bars (essentially just the last lightgreen bar)
    for (let k = 0; k < bars.length; k++) {
      bars[k].style.backgroundColor = "black";
    }
    //done
    return array;
  }