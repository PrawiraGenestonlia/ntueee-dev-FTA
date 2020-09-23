import React, {useState, useEffect} from 'react';
import { renderButton, checkSignedIn } from "../../utils/oauth";
import Report from "../../utils/report";
import Analytics from "../../utils/analyticsWidget";

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const updateSignin = (signedIn) => { //(3)
    setIsSignedIn(signedIn);
    if (!signedIn) {
      renderButton();
    }
  };

  const init = () => { //(2)
    checkSignedIn()
      .then((signedIn) => {
        updateSignin(signedIn);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    window.gapi.load("auth2", init); //(1)
  });

  return (
    <div>
      <div className="text-2xl">
        <div className="flex h-16 items-center ">
          <span className="text-blue-800">Dashboard</span>
        </div>
      </div>
      <div className="bg-divider" style={{ height: '0.1rem' }} />
      <div className="flex flex-col mt-4">
        <div>
          {!isSignedIn ? (
            <div id="signin-button"></div>
          ) : (
              <Analytics/>
            )}
        </div>
      </div>
    </div>
  )
}