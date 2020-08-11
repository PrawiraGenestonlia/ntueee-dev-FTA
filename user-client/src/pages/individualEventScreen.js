import React, { useState, useEffect } from 'react';
import TopNavBar from '../components/topNavBar';
import { getSpecificEvent } from '../api';
import { Spin, Button } from 'antd';
import BottomDiv from '../components/bottomDiv';
import { useLocation } from 'react-router-dom';
import { THEME_COLOR } from '../enum';
import AddToCalendar from 'react-add-to-calendar';
import { convertFromRaw, EditorState, } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

const whichDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const whichMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

export default (props) => {
  const eventName = props.match.params.event_name || '';
  const eventId = props.match.params.event_id || '';
  const fromPage = props.match.params.from_page || '';
  const [eventInfo, setEventInfo] = useState({});
  const { pathname } = useLocation();
  const [eventDate, setEventDate] = useState(new Date());
  const [contentState, setContentState] = useState(EditorState.createEmpty());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    getEventInfo(eventId)
  }, [eventId]);

  const getEventInfo = (eventId) => {
    getSpecificEvent(eventId).then(res => {
      if (res.status === 200) {
        setEventInfo(res.data);
        setEventDate(new Date(res.data[0].start));
        const loadedContentRaw = res.data[0].rawEditor.length > 10 ? convertFromRaw(JSON.parse(res.data[0].rawEditor)) : '';
        if (loadedContentRaw) setContentState(EditorState.createWithContent(loadedContentRaw));
      }
    }).catch(console.error);
  }

  useEffect(() => {
    console.log(eventInfo);
  }, [eventInfo]);

  const onSignUpClick = (link) => {
    window.open(link);
  }

  return (
    <div>
      <TopNavBar title={eventName} back={fromPage} />
      {
        Object.keys(eventInfo).length ?
          <>
            {/* <p className="break-words">{JSON.stringify(eventInfo)}</p> */}
            <div className="flex flex-col" style={{ color: THEME_COLOR.FONT }}>
              <div className="flex flex-col items-center"><img className="shadow-xl" src={eventInfo[0].imageUrl || `https://picsum.photos/seed/${eventInfo[0]._id}/400/200`} alt="event-cover" style={{ height: '25vh', width: 'auto' }} /></div>
              <div className="text-2xl mt-4">{eventInfo[0].title}</div>
              <div className="flex flex-col mt-2">
                <div className={screenWidth < 361 ? "text-xs" : ''} style={{ color: '#0084ff' }}>
                  {whichDay[eventDate.getDay()]},&nbsp;<strong>{eventDate.getDate()}</strong>&nbsp;{whichMonth[eventDate.getMonth()]}
                    &nbsp;&nbsp;●&nbsp;&nbsp;{eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="mt-2"><AddToCalendar event={eventInfo[0]} buttonLabel="Add to my calendar" buttonTemplate={{ 'calendar-plus-o': 'left' }} style={{ color: 'black' }} /></div>
              </div>
              <div className="mt-2">
                <Editor
                  wrapperClassName=""
                  editorClassName=""
                  editorStyle={{ height: '100%', overflow: 'hidden' }}
                  toolbarClassName=""
                  toolbarHidden
                  readOnly
                  editorState={contentState}
                />
              </div>

              <div className="mt-4"><Button block onClick={() => onSignUpClick(eventInfo[0].signUpLink)}>Sign Up</Button></div>
            </div>
            <BottomDiv />
          </>
          :
          <div className="flex w-full mt-48 justify-center">
            <Spin size="large" />
          </div>
      }
    </div>
  )
}