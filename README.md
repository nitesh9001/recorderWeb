# Getting Started with RecorderWeb package

This package is made for purpose to record screen in web (Access Camera, mic and auto - download feature).
## Without video only avatar
<img width="600" alt="image" src="https://user-images.githubusercontent.com/48119181/171716304-0d47fb24-8411-45ff-81b3-82d2677cfe5b.png">

## With video 

<img width="444" alt="image" src="https://user-images.githubusercontent.com/48119181/171832347-c88b3aa6-12c1-4386-859f-6a673caf4373.png">

> #### Features
>
> - Screen Recorder.
> - With mic access.
> - With camera(user video enabled you can switch while recording)
> - Downaload the video
> - You can enable auto-download 
> - enable timer 
> - switch to avatar mode(user video is disabled).
> - customize your error
> - add callback function while start or end of the recording.

## Browser Support

All browser support 
**But for mobile devices it is disabled as navigator does not support in mobile devices**

## Installing

Using npm:

`$ npm install recorderweb`

## Usage
And then include it in your module (import recorderweb from "recorderweb")
`import recoderweb from 'recorderweb'`

     let recorderWebObj = new RecorderWeb(); 

     recorderWebObj.create("RecoderWeb",{
      environment: "desktop",
      mic: true,
      camera: true,
      download: true,
      timer: true,
      screenShot: false,
      autoDownload: true, // to auto download video after stop
      videoFormat: "mp4", // need to add in package
      avatar: "Nitesh", // if want avatar then specify Name of like-  Nitesh, Ritesh 
      onStop: callBackOnStop, // get media tracks after stop
      onStart: callbackOnStart // get notify after start the recoding.
     });

     recorderWebObj.mount("id of your div where want to mount");

## Settings


|congif        | possible value  | type of value   |                 remarks                 |
|--------------|-----------------|-----------------|-----------------------------------------|
|  mic         |   true / fasle  |   boolean       |  to access mic keep it true (it can't   |                                                                       |              |                 |                 |  be enabled after start).               |
|  camera      |   true / fasle  |   boolean       |  to access user video keep it true.     |
|              |                 |                 |  you can switch while recording         | 
|  download    |   true / fasle  |   boolean       |  for download button keep the flag true |
|  timer       |   true / fasle  |   boolean       |  for showing timer keep the flag true   |
|  autoDownload|   true / fasle  |   boolean       |  for autodownload video after recording stop|
|  videoFormat |   mp4 (only *)  |   string        |  it must be mp4 for now                 |
|  avatar      |   name_of_user  |   srting        |  instead of video switch to avatar      |
|              |                 |                 |  (firstletter of you name)              |
|  screenShot  |   true / false  |   boolean       |  it disabled for now                    |
|____________________________________________________________________________________________|

## Callback Methods
  > -  onStart   :  This callback is trigered when the recording will start.
  > -  onStop    :  This callback is trigered when the recording will stop.
  > -  getTracks :  This will give you the traks of recordings you can modify 
                    it according to your  need (in beta version).

## License
MIT License.

## Development
This project was generated with Angular CLI version 1.7.1.

## Contributions
Contributions are welcome, please open an issue and preferrably file a pull request.

Opening Issue
Please share sample code using codesandbox.com or stackblitz.com to help me re-produce the issue.
