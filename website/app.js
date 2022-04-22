/* Global Variables */
const apiKey = "07cb458e25d3d53d4fe14b756e3f5683&units=imperial";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

//events
document.querySelector("#generate").addEventListener("click", action);

//function called by event listener
function action(e) {
  const zip = document.getElementById("zip").value;
  const feels = document.getElementById("feelings").value;
  if (!feels) {
    alert(`feeling are require`);
    return;
  }
  if (!zip) {
    alert("Please Enter a valid zip-code");
  } else {
    console.log(feels);
    getData(baseUrl, zip, apiKey)
      .then((data) => {
        postData("/postData", {
          temp: data.main.temp,
          date: newDate,
          content: feels,
        });
      })
      .then(updateUI);
  }
}

//async functions
//get data from api
async function getData(baseUrl, zip, apiKey) {
  const fetching = await fetch(baseUrl + zip + "&appid=" + apiKey);
  try {
    const data = fetching.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
//postData function
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}

// Update UI function
async function updateUI() {
  const response = await fetch("/getData");
  try {
    const data = await response.json();
    if (data.temp >= 0 && data.temp <= 50) {
      var tempreature = "v.cold";
    }
    if (data.temp >= 51 && data.temp <= 77) {
      var tempreature = "cold";
    }
    if (data.temp >= 78 && data.temp <= 86) {
      var tempreature = "modreate";
    }
    if (data.temp > 86) {
      var tempreature = "hot";
    }
    if (data.feel == "sad") {
      var feels =
        "why are you sad? here is some funney clips https://www.youtube.com/watch?v=2mSr6GgQV2Y";
    } else if (data.feel == "happy") {
      var feels = "glad to see you happy ";
    } else {
      var feels = ` my feeling: ${data.feel}`;
    }
    document.getElementById(
      "temp"
    ).innerHTML = `temperature is : ${tempreature} ${data.temp} F `;
    document.getElementById("date").innerHTML = `today is: ${data.date}`;
    document.getElementById("content").innerHTML = ` ${feels}`;
  } catch (error) {
    console.log(error);
  }
}
