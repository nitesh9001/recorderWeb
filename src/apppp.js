import './App.css';
import React, { useEffect, useState } from "react";
import CloseIcon from "./Assets/cross.svg";
import CameraOn from "./Assets/camera_on.svg";
import CameraOff from "./Assets/camera_off.svg";
import MicOn from "./Assets/mic_on.svg";
import MicOff from "./Assets/mic_off.svg";
import PlayOn from "./Assets/play_on.svg";
import PlayOff from "./Assets/play_off.svg";
import Download from "./Assets/download.svg";
import Alarm from "./Assets/alarm.svg";

const App = ()  => {
  const [ videoCam, setVideoCam ]= useState(false);
  const [ isMicOn, setIsMicOn ]= useState(false);
  const [ name, setName ]= useState("Nitesh");
  const [ isDownloadAvail, setisDownloadAvail ] = useState(false);
  const [ counterString, setCounterString ] = useState("00:00:00");
  const [ isRecordingStarted, setIsRecordingStarted ] = useState(false);
  const [ mediaCamera, setMediaCamera ] = useState(null);
  const [ streamAudio, setStreamAudio ] = useState(null);
  const [ streamScreen, setStreamScreen ] = useState(null);
  const [ flatError, setFlatError ] = useState("");
  const [ finalBlobVideo, setFinalBlobVideo] = useState(null);
  const [ finalBlobType, setFinalBlobType] = useState(null);
  const [ isMobile, setIsMobile] = useState(false);
  let counter=0;
  let streamsMixed= null;
  let recordedChunks=[];
  let mediaRecorder=null;
  let timerVar=null;
  const userCameraStream = async (access) => {
    if(isRecordingStarted && videoCam){
      var player = document.getElementById('player-user');
     
      const streamCamera =  await navigator.mediaDevices
      .getUserMedia({ video: {
        aspectRatio: 1,
        facingMode: "user"
      }});
      const newStream = new MediaStream(streamCamera.getVideoTracks());
      player.srcObject = newStream;
      setMediaCamera(streamCamera);
    }
  }
  if(mediaCamera){
   if(!isRecordingStarted){
    mediaCamera?.getTracks().forEach((track) => track.stop());
  }
 }
  useEffect(() =>{
   if(isRecordingStarted){
     userCameraStream(videoCam);
   }
  },[isRecordingStarted, videoCam]);

  const countTimer = () => {
    ++counter;
    var hour = Math.floor(counter /3600);
    var minute = Math.floor((counter - hour*3600)/60);
    var seconds = counter - (hour*3600 + minute*60);
    if(hour < 10)
      hour = "0"+hour;
    if(minute < 10)
      minute = "0"+minute;
    if(seconds < 10)
      seconds = "0"+seconds;
    setCounterString(`${hour} : ${minute} :${seconds}`)
 }
  const userMicrophoneStream = async (access) => {
    let streamAudios = access ? await navigator.mediaDevices
    .getUserMedia({ audio: {
        channelCount: 1,
        sampleRate: 16000,
        sampleSize: 16,
        volume: 1,
        echoCancellation: true,
        noiseSuppression: true,
    } }) : "";
    setStreamAudio(streamAudios);
    return streamAudios;
  }

  const userScreen = async() => {
    let stremsScr = await navigator.mediaDevices.getDisplayMedia({
      video: {
        mediaSource : "screen",
        width: { ideal: 1920, max: 1920 },
        height: { ideal: 1080, max: 1080 }
      }
    });
    setStreamScreen(stremsScr);
    return stremsScr;
  };

  useEffect(() => {
   if(navigator.maxTouchPoints > 1){
    setIsMobile(true);
    setFlatError("Not support in mobile devices")
   }
  },[])
  
  const openStream = async (e) => {
    setCounterString("00:00:00");
    setisDownloadAvail(false);
    userMicrophoneStream(isMicOn).then(audioResponse => {
    setIsRecordingStarted(!isRecordingStarted);
      userScreen().then(screenResponse => {
       timerVar = setInterval(countTimer, 1000);
       var options = {
        audioBitsPerSecond : 128000,
        videoBitsPerSecond : 2500000,
      }
       let tracks = audioResponse ? [...screenResponse?.getVideoTracks(), ...audioResponse?.getAudioTracks()] 
                    : [...screenResponse?.getVideoTracks()];
       streamsMixed = new MediaStream(tracks);
       mediaRecorder = new MediaRecorder(streamsMixed, options);
       setFinalBlobType(mediaRecorder?.mimeType);
       var playerV = document.getElementById('player');
       mediaRecorder.ondataavailable =  function(e) {
         if (e.data.size > 0) {
           console.log(e?.data);
           recordedChunks.push(e.data);
         }
     };
     mediaRecorder.onerror= function(e){ 
      setFlatError(e.toString());
      console.log("Error on media Recorder", e);
     } 
     
     const handleClose = () =>  {
       screenResponse?.getTracks().forEach((track) => track?.stop());
       isMicOn && audioResponse?.getTracks().forEach((track) => track?.stop());
      //  playerV.src = URL.createObjectURL(new Blob(recordedChunks)); // if wants a player too
       setFinalBlobVideo(recordedChunks);
       setisDownloadAvail(true);
       clearInterval(timerVar);
       setIsMicOn(false);
       setVideoCam(false);
       setIsRecordingStarted(false);
      //  mediaRecorder.stop();
     };
     alert("hello 1");
     screenResponse.oninactive = handleClose;
     mediaRecorder.start(200); 
    }).catch(err => {
      setFlatError(err.toString());
      setIsRecordingStarted(false);
      clearInterval(timerVar);
      console.log("Screen Recoder Error", err);
    })
  }).catch(errs => {
    setFlatError( errs.toString() || JSON.stringify(errs));
    setIsRecordingStarted(false);
    clearInterval(timerVar);
    console.log("Audio Error", errs);
  })
  }
  const downLoadVideo = (e) => {
    e.preventDefault();
    setCounterString("00:00:00");
    const blob = new Blob(finalBlobVideo, {type: 'video/mp4'});
    console.log("auido DOMException: Permission denied 1")
    const url = window.URL.createObjectURL(blob);
    console.log("auido DOMException: Permission denied 2")
    const a = document.createElement('a');
    console.log("auido DOMException: Permission denied 3")
    a.style.display = 'none';
    a.href = url;
    console.log("auido DOMException: Permission denied 4")
    a.download = `${new Date().getTime()}.mp4`;
    console.log("auido DOMException: Permission denied 5")
    document.body.appendChild(a);
    console.log("auido DOMException: Permission denied 6")
    a.click();
    console.log("auido DOMException: Permission denied 7")
    setTimeout(() => {
      document.body.removeChild(a);
      console.log("auido DOMException: Permission denied 8")
      window.URL.revokeObjectURL(url);
    }, 100);
    setisDownloadAvail(false);
  }

  const handleCloseRecord = () =>  {
    streamScreen?.getTracks().forEach((track) => track?.stop());
    isMicOn && streamAudio?.getTracks().forEach((track) => track?.stop());
    setisDownloadAvail(true);
    clearInterval(timerVar);
    setIsMicOn(false);
    setVideoCam(false);
    setIsRecordingStarted(false);
  };
  return (
    <div className="Aspp">
      {/* <video id="player" controls autoPlay style={{width: "800px", height:"400px", borderRadius:"5px",marginTop:"20px"  }}></video> */}
      <div className='IXN-screen-recorder-main'>
        { !flatError.length > 0 ? 
         <div className= "IXN-screen-recorder-inner-wrapper">
          {isRecordingStarted && 
           <div className='IXN-screen-recorder-inner-wrapper-animation'>
            <div className="IXN-startAnimation">
            </div>
           </div>
          }
        <div className='IXN-screen-recorder-inner-video-cam-user'>
          {videoCam ?
              <video id="player-user" autoPlay muted onClick={() => {
                setVideoCam(!videoCam);
                mediaCamera?.getTracks().forEach((track) => track.stop());
              }}
                className='IXN-screen-recorder-inner-video-cam-user-video'
                style={{width: "100px", height:"100px", borderRadius:"50px" }}>
            </video> : 
            <span className='IXN-screen-recorder-inner-video-cam-user-avatar'>{name[0]}</span>
          }
        </div>
        <div  className='IXN-screen-recorder-inner-button-cam-start'>
          {isRecordingStarted ? 
             <img src={PlayOn} alt="X" className='IXN-screen-recorder-inner-button-cam-on' 
                onClick={() => {
                  setIsRecordingStarted(!isRecordingStarted);
                  handleCloseRecord();
                }}/>
             : 
             <img src={PlayOff} alt="X" className='IXN-screen-recorder-inner-button-cam-off' onClick={(e) => {
               openStream(e);
              }}/>
          }
        </div>
        <div  className='IXN-screen-recorder-inner-button-cam-start'>
          {videoCam ? 
               <img src={CameraOn} alt="X" className='IXN-screen-recorder-inner-button-cam-on' onClick={() => {
                setVideoCam(!videoCam);
                mediaCamera?.getTracks().forEach((track) => track.stop());
              }}/>
             : 
             <img src={CameraOff} alt="X" className='IXN-screen-recorder-inner-button-cam-off' onClick={() => {
              setVideoCam(true)
              userCameraStream(true);
             }}/>
          }
        </div>
        <div  className='IXN-screen-recorder-inner-button-cam-start'>
          {isMicOn ? 
             <img src={MicOn} alt="X" className='IXN-screen-recorder-inner-button-cam-on' onClick={() => {
              streamAudio?.getTracks().forEach((track) => track.stop()); 
              setIsMicOn(!isMicOn)
              }}/>
             : 
             <img src={MicOff} alt="X" className='IXN-screen-recorder-inner-button-cam-off' onClick={() => {
                if(!isRecordingStarted){
                  setIsMicOn(!isMicOn)
                }else{
                  setFlatError("Can't unmute in mid")
                }}
              }/>
          }
        </div>
        <div  className='IXN-screen-recorder-inner-button-cam-start'>
          {isDownloadAvail ? 
             <a id="download_video" onClick={downLoadVideo} >
              <img src={Download} alt="X" className='IXN-screen-recorder-inner-button-cam-on' 
               />
              </a>
             :
             <img src={Download} alt="X" className='IXN-screen-recorder-inner-button-cam-off' />
          }
        </div>
        <div  className='IXN-screen-recorder-inner-button-cam-start'>
            <img src={Alarm} alt="X" className='IXN-screen-recorder-inner-button-cam-off' />
            <span style={{color:"#1b9bff", fontSize:"10px"}}>{counterString}</span>
        </div>
      </div> : 
      <div className= "IXN-screen-recorder-inner-wrapper error-flat-close">
        <span>{flatError}</span>
        {!isMobile && <img src={CloseIcon} style={{width:"10px"}} onClick={() => setFlatError("")} alt=""/>}
      </div>}
      </div>
    </div>
  );
}

export default App;
