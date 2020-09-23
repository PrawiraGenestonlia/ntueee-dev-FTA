import React from 'react';
import { GoogleProvider, GoogleDataChart } from 'react-analytics-widget'

const CLIENT_ID = '718330819225-542usqad9bhoea5119mogtk4k5k27b7h.apps.googleusercontent.com';

// graph 1 config
const last30days = {
  reportType: "ga",
  query: {
    dimensions: "ga:date",
    metrics: "ga:pageviews",
    "start-date": "30daysAgo",
    "end-date": "yesterday"
  },
  chart: {
    type: "LINE",
    options: {
      // options for google charts
      // https://google-developers.appspot.com/chart/interactive/docs/gallery
      title: "Last 30 days pageviews"
    }
  }
}

// graph 2 config
const last7days = {
  reportType: "ga",
  query: {
    dimensions: "ga:date",
    metrics: "ga:pageviews",
    "start-date": "7daysAgo",
    "end-date": "yesterday"
  },
  chart: {
    type: "LINE"
  }
}

// analytics views ID
const views = {
  query: {
    ids: "ga:225726186"
  }
}

export default () => (
  <GoogleProvider clientId={CLIENT_ID}>
    <GoogleDataChart views={views} config={last30days} style={{width:'100%'}}/>
    <GoogleDataChart views={views} config={last7days} style={{width:'100%'}}/>
    <GoogleDataChart views={views} config={last30days} style={{width:'100%'}}/>
    <GoogleDataChart views={views} config={last7days} style={{width:'100%'}}/>
  </GoogleProvider>
)