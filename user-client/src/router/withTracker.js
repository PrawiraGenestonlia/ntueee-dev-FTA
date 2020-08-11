
import React, { useEffect } from "react";
import ReactGA from 'react-ga';

export default function withTracker(WrappedComponent, options = {}) {
  const trackPage = (page) => {
    ReactGA.set({
      page,
      ...options
    });
    ReactGA.pageview(page)
  }

  const HOC = (props) => {

    useEffect(() => {
      const { location: { pathname: page } } = props;

      trackPage(page);
      //eslint-disable-next-line
    }, []);

    useEffect(() => {
      const { location: { pathname: currentPage } } = props;
      const nextPage = props.location.pathname;
      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }

    }, [props]);

    return <WrappedComponent {...props} />;
  }

  return HOC;
}