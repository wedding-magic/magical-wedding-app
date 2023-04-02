import React from 'react';
import { useEffect } from 'react';

const ShowStatusBar = ({children}) => {
    useEffect(() => {
        document.querySelector('.for-StatusBar').style.visibility = "visible";
      }, []);
      return children
};

export default ShowStatusBar;