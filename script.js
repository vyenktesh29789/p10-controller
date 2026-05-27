/*--------------------------------------------------
  ADAFRUIT SETTINGS
--------------------------------------------------*/

const AIO_USERNAME = "myflawsome";

const AIO_KEY = "aio_xvUe83Q8qS0pKtPOOHysxfK9sifD";

const FEED = "p10text";

/*--------------------------------------------------
  ELEMENTS
--------------------------------------------------*/

const mode = document.getElementById("mode");

const singleRowCard = document.getElementById("singleRowCard");

const doubleRowCard = document.getElementById("doubleRowCard");

const speedSlider = document.getElementById("speed");

const brightnessSlider = document.getElementById("brightness");

const speedValue = document.getElementById("speedValue");

const brightnessValue = document.getElementById("brightnessValue");

/*--------------------------------------------------
  MODE CHANGE
--------------------------------------------------*/

mode.addEventListener("change", () => {

  if(mode.value === "SR"){

    singleRowCard.classList.remove("hidden");

    doubleRowCard.classList.add("hidden");

  }else{

    singleRowCard.classList.add("hidden");

    doubleRowCard.classList.remove("hidden");
  }
});

/*--------------------------------------------------
  SLIDER VALUES
--------------------------------------------------*/

speedSlider.addEventListener("input", () => {

  speedValue.innerHTML = speedSlider.value;
});

brightnessSlider.addEventListener("input", () => {

  brightnessValue.innerHTML = brightnessSlider.value;
});

/*--------------------------------------------------
  SEND DATA
--------------------------------------------------*/

async function sendData(){

  const key = document.getElementById("key").value;

  if(key !== "1234"){

    alert("Wrong Security Key");

    return;
  }

  let payload = "";

  if(mode.value === "SR"){

    const text = document.getElementById("singleText").value;

    payload =
      "SR|" +
      text +
      "|" +
      speedSlider.value +
      "|" +
      brightnessSlider.value;

  }else{

    const first =
      document.getElementById("firstRow").value;

    const second =
      document.getElementById("secondRow").value;

    payload =
      "DR|" +
      first +
      "|" +
      second +
      "|" +
      speedSlider.value +
      "|" +
      brightnessSlider.value;
  }

  document.getElementById("status").innerHTML =
    "Sending...";

  try{

    const response = await fetch(

      `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${FEED}/data`,

      {

        method:"POST",

        headers:{

          "Content-Type":"application/json",

          "X-AIO-Key":AIO_KEY
        },

        body:JSON.stringify({

          value:payload
        })
      }
    );

    if(response.ok){

      document.getElementById("status").innerHTML =
        "Message Sent Successfully";

    }else{

      document.getElementById("status").innerHTML =
        "Failed To Send";
    }

  }catch(error){

    document.getElementById("status").innerHTML =
      "Network Error";
  }
}