// import Uppy from '@uppy/core';
import React from 'react';
import { DragDrop } from '@uppy/react';
import './uploadPageStyle.css';
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

//uploader component. returns a DragDrop component from Uppy react library linked to the uppy object defined in App.jsx passed as a prop

export default function Uploader (props) {

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
      await console.log(container);
  }, []);

  return (

    <div>

<Particles id="tsparticles"
                   init={particlesInit}
                   loaded={particlesLoaded} 
                   options={{
                        "particles": {
                          "number": {
                            "value": 15,
                            "density": {
                              "enable": true,
                              "value_area": 789.1476416322727
                            }
                          },
                          "color": {
                            "value": "#ffffff"
                          },
                          "shape": {
                            "type": "circle",
                            "stroke": {
                              "width": 0,
                              "color": "#000000"
                            },
                            "polygon": {
                              "nb_sides": 5
                            },
                            "image": {
                              "src": "img/github.svg",
                              "width": 100,
                              "height": 100
                            }
                          },
                          "opacity": {
                            "value": 0.48927153781200905,
                            "random": false,
                            "anim": {
                              "enable": true,
                              "speed": 0.2,
                              "opacity_min": 0,
                              "sync": false
                            }
                          },
                          "size": {
                            "value": 2,
                            "random": true,
                            "anim": {
                              "enable": true,
                              "speed": 2,
                              "size_min": 0,
                              "sync": false
                            }
                          },
                          "line_linked": {
                            "enable": false,
                            "distance": 150,
                            "color": "#ffffff",
                            "opacity": 0.4,
                            "width": 1
                          },
                          "move": {
                            "enable": true,
                            "speed": 0.2,
                            "direction": "none",
                            "random": true,
                            "straight": false,
                            "out_mode": "out",
                            "bounce": false,
                            "attract": {
                              "enable": false,
                              "rotateX": 600,
                              "rotateY": 1200
                            }
                          }
                        },
                        "interactivity": {
                          "detect_on": "canvas",
                          "events": {
                            "onhover": {
                              "enable": true,
                              "mode": "bubble"
                            },
                            "onclick": {
                              "enable": true,
                              "mode": "push"
                            },
                            "resize": true
                          },
                          "modes": {
                            "grab": {
                              "distance": 400,
                              "line_linked": {
                                "opacity": 1
                              }
                            },
                            "bubble": {
                              "distance": 83.91608391608392,
                              "size": 1,
                              "duration": 3,
                              "opacity": 1,
                              "speed": 3
                            },
                            "repulse": {
                              "distance": 200,
                              "duration": 0.4
                            },
                            "push": {
                              "particles_nb": 4
                            },
                            "remove": {
                              "particles_nb": 2
                            }
                          }
                        },
                        "retina_detect": true
                      }}
        />

      <h5 className='uploaderTitle'> </h5>
      <div class="fields">
        <div>
          <fieldset>
              <legend>Select your gender:</legend>
              <div class="radio">
                <input type="radio" id="male" name="gender" value="male" checked/>
                <label for="male">Male</label>
              </div>
              <div class="radio">
                <input type="radio" id="female" name="gender" value="female" />
                <label for="female">Female</label>
              </div>
          </fieldset>
        </div>
        <br />
        <div>
          <fieldset>
              <legend>Upload your photos:</legend>
                <br />
                  <div class="upload">
                  <DragDrop uppy={props.uppy}
                    locale={{
                      strings: {
                        dropHereOr: 'Drop images folder here'
                      }
                    }}
                    note='Image files only (.jpg .jpeg or .png), recommended 20-30 pictures with varied backgrounds and clear view of face. Min number of files: 15, Max total file size: 200 MB' 
                  />
                  
                  <img class="profile-photo" src="https://i.imgur.com/nOd8BF8.jpg" alt="Generated avatar" />
                  </div>
            </fieldset>
          </div>
          <div>
            <button class="submit-btn">Submit</button>
          </div>
      </div>
    </div>
      
  
  
  
  
  
  
  
  );
}