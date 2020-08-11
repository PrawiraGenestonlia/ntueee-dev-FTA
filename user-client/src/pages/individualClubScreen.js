import React, { useState, useEffect } from 'react';
import TopNavBar from '../components/topNavBar';
import { getSpecificClubInfo } from '../api';
import { Spin, Button } from 'antd';
import BottomDiv from '../components/bottomDiv';
import { useLocation } from 'react-router-dom';
import { THEME_COLOR } from '../enum';
import { convertFromRaw, EditorState, } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

export default (props) => {
  const clubName = props.match.params.club_name || '';
  const clubId = props.match.params.club_id || '';
  const [clubInfo, setClubInfo] = useState({});
  const { pathname } = useLocation();
  const [contentState, setContentState] = useState(EditorState.createEmpty());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    getClubInfo(clubId)
  }, [clubId]);

  const getClubInfo = (clubId) => {
    getSpecificClubInfo(clubId).then(res => {
      if (res.status === 200) {
        setClubInfo(res.data);
        const loadedContentRaw = res.data[0].rawEditor.length > 10 ? convertFromRaw(JSON.parse(res.data[0].rawEditor)) : '';
        if (loadedContentRaw) setContentState(EditorState.createWithContent(loadedContentRaw));
      }
    }).catch(e => { })
  }

  useEffect(() => {
    console.log(clubInfo)
  }, [clubInfo]);

  const onContactClick = (url) => {
    window.open(url);
  }

  return (
    <div>
      <TopNavBar title={clubName} back="Home" />
      {
        Object.keys(clubInfo).length ?
          <>
            {/* <p className="break-words">{JSON.stringify(clubInfo)}</p> */}

            <div className="flex flex-col" style={{ color: THEME_COLOR.FONT }}>
              <div className="flex flex-col items-center"><img className="shadow-xl" src={clubInfo[0].bannerImgLink} alt="event-cover" style={{ height: '25vh', width: 'auto' }} /></div>
              <div className="mt-4">
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
              <div className="mt-4"><Button block onClick={() => onContactClick(clubInfo[0].contactLink)}>Contact</Button></div>
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