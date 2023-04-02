import React from 'react';
import { useEffect } from 'react';

const HideStatusBar = ({children}) => {
    useEffect(() => {
        document.querySelector('.for-StatusBar').style.visibility = "hidden";
      }, []);
      return children
};

export default HideStatusBar;