// import Uppy from '@uppy/core';
import React from 'react';
import { DragDrop } from '@uppy/react';

export default function Uploader (props) {


  return (

   <>
    <h5 className='uploaderTitle'>Upload your pictures here</h5>
    
    <DragDrop uppy={props.uppy}
    locale={{
      strings: {
        dropHereOr: 'Drop images folder here'
      }
    }}
    note='Image files only (.jpg .jpeg or .png), recommended 35-50 pictures with varied backgrounds and clear view of face. Max total file size: 200 MB' 
    target='.example-one .for-DragDrop' 
    width='50%'/>
    
    
    </>
      
  
  
  
  
  
  
  
  );
}