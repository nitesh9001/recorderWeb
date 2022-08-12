import React, { useEffect } from "react";
import RecorderWeb from "recorderweb";
import './App.css';

const RecorderTest = () => {
  let borderfreeMerchantObj = new RecorderWeb();
  const callBackOnStop = () => {
    console.log("f");
  }
  const callbackOnStart = () => {
    console.log("Started the recording");
    alert("hello");
  };
  useEffect(() => {
    console.log(window.navigator.vendor,navigator.maxTouchPoints , window.navigator.userAgentData, window.Navigator.userAgentData)
     borderfreeMerchantObj.create("RecoderWeb",{
      environment: "desktop",
      mic: true,
      camera: true,
      download: true,
      timer: true,
      screenShot: false,
      autoDowload: true, // to auto download video after stop
      videoFormat: "mp4", // need to add in package
      avatar: "Nitesh", // if want avatar then specify Name of like-  Nitesh, Ritesh 
      onStop: callBackOnStop, // get media tracks after stop
      onStart: callbackOnStart // get notify after start the recoding .
     });
     borderfreeMerchantObj.mount("showterecorder");
  }, []);
  console.log("config", borderfreeMerchantObj)

return (
  <div>
    <div id="showterecorder" style={{border:"1px solid red"}}>
    </div>
  </div>
)
}

export default RecorderTest;
