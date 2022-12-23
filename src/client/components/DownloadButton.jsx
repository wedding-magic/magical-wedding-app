import React from 'react';







export default function DownloadButton (props) {

const onButtonClick = () => {fetch(imagesUrl).then(
    response => response.json()).then(
        urlArray => urlArray.forEach( (item) => downloadImage(item))
    )};







const downloadImage = (url) => {
    // using Java Script method to get PDF file
    fetch(url).then(response => {
        response.blob().then(blob => {
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(blob);
            // Setting various property values
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = name;
            document.body.appendChild(alink);
            alink.click();
            document.body.removeChild(alink);
        })
    })
}

return (
    <button onClick={onButtonClick}>
    Download file
</button>
)

}