// Personal API Key for OpenWeatherMap API
const apiKey = "18334e21ef0252dc65c4f2d7560addf0";

/* Global Variables */
const dataDiv = document.getElementById("date");
const divContent = document.getElementById("content");
const zipInput = document.getElementById("zip");
const feelingsText = document.getElementById("feelings");
const divTemp = document.getElementById("temp");
const btn = document.getElementById("generate");

// Function
// [#] Create The Full url link
let mainUrl = function (code) {
  let units = "metric";
  let zipCode = code;
  let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=${units}`;
  return url;
};

// [#] Send The Data To The Server Side
const postToServer = async (dataObj) => {
  await fetch("/api/weather", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: dataObj,
  });
};

// [#] Change The HTML Data
const changeHtmlData = async () => {
  const get = await fetch("/api/object");
  try {
    const { dataObj } = await get.json();
    const { temp, description, date } = dataObj;
    // [dataDiv , divContent, divTemp]
    divTemp.innerHTML = `${temp} °C`;
    divContent.innerHTML = description;
    dataDiv.innerHTML = date;
  } catch (error) {
    console.log(error);
  }
};

// [#] Get The JSON Obj From The External API
let getSendExApiObj = async function (url, newDate, feelingsTextVal) {
  // [#] Get The Res Obj From The API
  let fetchObj = await fetch(url);
  let jsonObj = await fetchObj.json();

  // [#] Check If The Status Code Is OK
  if (jsonObj.cod !== 200) throw Error("Not Found");

  // [#] Get The Data From The json Obj
  let temp = Math.round(jsonObj.main.temp);
  let description = feelingsTextVal;
  let date = newDate;

  // [#] Make Data Obj to Send It
  let dataObj = JSON.stringify({ temp, description, date });

  // [#] Send The Data To The Server Side
  postToServer(dataObj);

  // [#] Change The HTML Data
  changeHtmlData();
};

// [#] Add Event Listener To The Button
btn.addEventListener("click", () => {
  // [#] Create a new date instance dynamically with JS
  let d = new Date();
  let newDate =
    d.getMonth() + 1 + " / " + d.getDate() + " / " + d.getFullYear();

  // [#] Get The feelings Value
  let feelingsTextVal = feelingsText.value;

  // [1] Get The Inputs Value
  let zipValue = Number(zipInput.value);

  // [2] Create The URL And Save The Value
  let url = mainUrl(zipValue);

  // [3] Get The JSON Obj From The External API
  // And Change The HTML Data
  getSendExApiObj(url, newDate, feelingsTextVal);

});
