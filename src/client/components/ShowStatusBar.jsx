import { useEffect } from 'react';

//wrapper component to make its children visible. Used to toggle visibility of Status Bar linked to Uploader component

const ShowStatusBar = ({children}) => {
    useEffect(() => {
        document.querySelector('.for-StatusBar').style.visibility = "visible";
      }, []);
      return children
};

export default ShowStatusBar;