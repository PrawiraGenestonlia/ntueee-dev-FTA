import React, { useEffect, useState } from 'react';
import preval from 'preval.macro';

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  try {
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
    }
    if (/android/i.test(userAgent)) {
      return "Android";
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
    }
  } catch (err) {
    return "Error";
  }
  return "Unknown";
}

const dateTimeStamp = preval`module.exports = new Date().toLocaleString('en-US', { timeZone: 'Asia/Singapore' });`;

export default (props) => {
  const [isShown, setIsShown] = useState(true);

  const currentDevice = getMobileOperatingSystem();

  useEffect(() => {
    console.log("Running e3vis");

    if ((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true) {
      setIsShown(false);
    }

    if (currentDevice === "Unknown") {
      setIsShown(false);
    }

    if (localStorage.getItem('last-bundled-time')) {
      if (localStorage.getItem('last-bundled-time') !== dateTimeStamp) {
        localStorage.setItem('last-bundled-time', dateTimeStamp);
        console.log('force refresh!');
        window.location.reload(true);
      } else {
        console.log("no force refresh!")
      }
    } else {
      localStorage.setItem('last-bundled-time', dateTimeStamp);
    }


    if (process.env.NODE_ENV === 'development') {
      setIsShown(false);
    }

  }, [currentDevice]);

  return (
    <>
      {isShown ? <div className="flex w-screen h-screen flex-col items-center justify-center">
        <h5 className="font-bold">Download the A<div className="inline" onClick={() => setIsShown(false)}>p</div>p ({currentDevice})</h5>
        <p>1. Tap on share<br />2. Tap Add to Home screen</p>
      </div>
        : <>{props.children}</>}
    </>
  );
}