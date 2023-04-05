
import { useEffect } from 'react';

//wrapper component to hide its children. Used to toggle visibility of StatusBar linked to Uploader component

const HideStatusBar = ({children}) => {
    useEffect(() => {
        document.querySelector('.for-StatusBar').style.visibility = "hidden";
      }, []);
      return children
};

export default HideStatusBar;