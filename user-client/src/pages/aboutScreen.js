import React, { useEffect } from 'react';
import { Button, Divider } from 'antd';
import unregisterServiceWorker from '../utils/unregisterServiceWorker';
import TopNavBar from '../components/topNavBar';
import {
  useLocation,
  // useHistory
} from 'react-router-dom';
import { THEME_COLOR } from '../enum';
import preval from 'preval.macro';
// import { HOME_URL } from '../router/constants.router';
import qrSVG from '../assets/svg/qr_web.svg';

export default () => {
  const { pathname } = useLocation();
  // const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const dateTimeStamp = preval`module.exports = new Date().toLocaleString('en-US', { timeZone: 'Asia/Singapore' });`

  return (
    <div>
      <TopNavBar title="About" back="Me" />
      <div className="rounded-md p-2" style={{ backgroundColor: THEME_COLOR['BACKGROUND_SECONDARY'] }}>
        <div>
          <h5 className="font-bold">Share the App</h5>
          <div className="flex items-center justify-center">
            <img className="h-40 w-40 m-2 shadow-lg" src={qrSVG} alt="sharing qr" />
          </div>
        </div>
        <Divider />
        <div>
          <h5 className="font-bold">Download the App</h5>
          <p>1. Tap on share<br />2. Tap Add to Home screen</p>
        </div>
        <Divider />
        <div>
          <h5 className="font-bold">About the App</h5>
          <p>E3VIS is designed to integrate NTU EEE Freshmen into university life. Not only that, there are a lot of cool features such as EEE Calendar of Events!</p>
        </div>
        <Divider />
        <div>
          <h5 className="font-bold">Contact Us</h5>
          <p> Click &nbsp;<a href={`mailto:praw0001@e.ntu.edu.sg?subject=From E3VIS&cc=xgshao@ntu.edu.sg`} >Send email </a> &nbsp; to send an email and contribute your idea. </p>
        </div>
        <Divider />
        <div>
          <h5 className="font-bold">Version</h5>
          <p>Release: 0.8.1<br /> <span className="text-gray-500">{dateTimeStamp} GMT+8</span></p>
          <p>
            <Button block type="dashed" danger onClick={() => {
              unregisterServiceWorker().then(() => {
                window.location.reload(true);
              })
            }}>Update to latest version</Button>
          </p>
        </div>
        <Divider />
      </div>
    </div>

  )
}