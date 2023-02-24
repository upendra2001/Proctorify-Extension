(function() {

    const video = document.querySelector('#basic video');
    const audio = document.querySelector('#basic audio');
    const startVideoButton = document.querySelector('#basic #start-button');
    const stopVideoButton = document.querySelector('#basic #stop-button');

    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const sec=1000;

    //Start Video
    startVideoButton.onclick = function() {
       navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      })
      .then(stream => {

        window.localStream = stream;
        video.srcObject = stream;
        audio.srcObject = stream;
      })
      .then(function(){
        setInterval(takeSnap,3*sec)           //change time according to your needs
      })
      .catch((err) => {
        console.log(err);
      });
    };



    //Take snap
    function takeSnap(){
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        // console.log('hello');
        var dataURI = canvas.toDataURL('image/jpeg');
        console.log(dataURI);

        var emailValue=location.search.substring(1);
        console.log(dataURI);
        fetch("http://localhost:8000/snaps", {
            method: "POST",
            mode:"cors",
            body: JSON.stringify({
                img:dataURI,
                email:emailValue,
                timeStamp:Date.now()/1000
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((json) => console.log(json))

    };


    //Stop Video
    stopVideoButton.onclick = function() {

      localStream.getVideoTracks()[0].stop();
      video.src = '';

      localStream.getAudioTracks()[0].stop();
      audio.src = '';
    };


  })();

