// const weightInKg = parseFloat(process.argv[2]);
// const heightInM = parseFloat(process.argv[3]);
// const age =
//   parseInt(process.argv[4]) > 18
//     ? parseInt(process.argv[4])
//     : "This formula is only for Adults over 18 years old";
// const gender = process.argv[5];
// const dailyExercise = process.argv[6];

// const BMI = weightInKg / (heightInM * heightInM);
// const idealWeightKg = 22.5 * heightInM * heightInM;
// const heightInCm = heightInM * 100;

// const BMR =
//   gender === "male"
//     ? 10 * weightInKg + 6.25 * heightInCm - 5 * age + 50
//     : 10 * weightInKg + 6.25 * heightInCm - 5 * age - 150;

// const dailyCalories = dailyExercise === "yes" ? BMR * 1.6 : BMR * 1.4;

// const weightToLoseKg = weightInKg - idealWeightKg;

// const dietWeeks = Math.abs(weightToLoseKg / 0.5);
// const dietCalories =
//   weightToLoseKg > 0 ? dailyCalories - 500 : dailyCalories + 500;

// console.log(`
// **************
// BMI CALCULATOR
// **************

// age: ${age} years
// gender: ${gender}
// height: ${heightInM} m
// weight: ${weightInKg} kg
// do you exercise daily? ${dailyExercise}

// ****************
// FACING THE FACTS
// ****************

// Your BMI is ${Math.round(BMI)}

// A BMI under 18.5 is considered underweight
// A BMI above 25 is considered overweight

// Your ideal weight is ${Math.round(idealWeightKg)} kg
// With a normal lifestyle you burn ${Math.round(dailyCalories)} calories a day

// **********
// DIET PLAN
// **********

// If you want to reach your ideal weight of ${Math.round(idealWeightKg)} kg:

// Eat ${Math.round(dietCalories)} calories a day
// For ${Math.round(dietWeeks)} weeks
// `);

// document.addEventListener('DOMContentLoaded',()=>{

// })

let infoLists = [];

const addInfo = (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const heightInM = document.getElementById("height").value / 100;
  const weightInKg = document.getElementById("weight").value;
  const gender = document.getElementById("gender").value;
  const dailyExercise = document.getElementById("excersize").value;

  //chacker if data is filled
  if (
    name === null ||
    age === "" ||
    heightInM === "" ||
    weightInKg === "" ||
    gender === "" ||
    dailyExercise === ""
  ) {
    const result = document.querySelector(".result");
    result.innerHTML = `<h3 class="resultHeader">You missed to fill all Data</h3> `;
  } else {
    //   output to calculate our formulas and us as input in our results
    const BMI = Math.round(weightInKg / (heightInM * heightInM));
    const bodyType =
      BMI < 18.5 ? "Underweight" : BMI > 25 ? "Overweight" : "Normal";
    const idealWeightKg = 22.5 * heightInM * heightInM;
    const heightInCm = heightInM * 100;
    const BMR =
      gender === "male"
        ? 10 * weightInKg + 6.25 * heightInCm - 5 * age + 50
        : 10 * weightInKg + 6.25 * heightInCm - 5 * age - 150;
    const dailyCalories = dailyExercise === "yes" ? BMR * 1.6 : BMR * 1.4;
    const weightToLoseKg = weightInKg - idealWeightKg;
    const dietWeeks = Math.abs(weightToLoseKg / 0.5);
    const dietCalories =
      weightToLoseKg > 0 ? dailyCalories - 500 : dailyCalories + 500;
    // object to store our data
    let infoList = {
      name: name,
      age: age,
      heightInM: heightInM,
      weightInKg: weightInKg,
      gender: gender,
      BMI: BMI,
      bodyType: bodyType,
      idealWeightKg: idealWeightKg,
      heightInCm: heightInCm,
      BMR: BMR,
      dailyExercise: dailyExercise,
      weightToLoseKg: weightToLoseKg,
      dietWeeks: dietWeeks,
      dietCalories: dietCalories,
    };

    // reset input fields
    document.forms[0].reset();

    // print calculated into to Page
    function calculated(infoList) {
      return `
            <h3 class="resultHeader">
            You BMI is : <span class="bmi-result">${BMI} </span>
            </h3>
            <p class="resultP">
            Your body type is considered : <span class="bt-result">${bodyType} </span>
            </p>
            <p class="resultP">
            Your ideal weight : <span class="ideal-result"> ${Math.round(
              idealWeightKg
            )}</span>
            </p>
            <p class="resultP">
            Your normal daily calories intake is: ${Math.round(dailyCalories)}
            <span class="dialy-cal-result"> </span>
            </p>
            <br />
            <p class="resultP">
            Expected calories to reach ideal weight:
            <span class="dietCalories"> ${Math.round(dietCalories)}</span>
            </p>
            <p class="resultP">
            Expected number of week to reach ideal weight:
            <span class="dietWeeks"> ${Math.round(dietWeeks)}</span>
            </p>
            <div class="save"><button id="savebtn">Save</button></div>`;
    }
    const result = document.querySelector(".result");
    result.innerHTML = calculated(infoList);

    // save to local storage
    infoLists.push(infoList);
    localStorage.setItem("infoLists", JSON.stringify(infoLists));

    const saveBtn = document.getElementById("savebtn");
    if (saveBtn !== null) {
      saveBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const historyArray = JSON.parse(localStorage.getItem("infoLists"));
        console.log('array of items',historyArray);
 
        historyArray.map((listItem) => {
          console.log('list item =',listItem);
          const li=document.querySelector(".history-ul").innerHTML = saveList(listItem);
               
              function saveList(listItem) {
                return `
                <li class='list'>
                Name: ${listItem.name}, Age: ${listItem.age}, BMI: ${listItem.BMI}, Ideal Weight: ${listItem.idealWeightKg}
              </li>`;
              }
              return li
        });
      });
    }
  }
};

// adding event listener to our button to apply our function
const calbtn = document.getElementById("calculate");
calbtn.addEventListener("click", addInfo);
