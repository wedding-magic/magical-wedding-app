import React from 'react';
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import './landingPageStyle.css';


export default function LandingPageContainer2(props){

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
    <div className='landingPageContainer2'>
        
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

        <html>
            <head>
                <meta charset="UTF-8" />
                <title>Avatar Genie</title>
                <link rel="stylesheet" href="style.css" />
            </head>
            <body>
                <header>
                    <h1 class="create-avatar-btn-top"><span class="text-top"> Avatar Genie </span></h1>
                </header>
                <main>
                    <div class="copy">• Get 99 unique, AI-illustrated avatars!</div>
                    <div class="copy">• Just upload photos, no cropping needed</div>
                    
                    <div class="photo">
                        <img class="photo" src="https://i.imgur.com/nOd8BF8.jpg" alt="Generated avatar" />
                    </div>
                    <br />
                    <div class="photo">
                        <img class="photo" src="https://i.imgur.com/nOd8BF8.jpg" alt="Generated avatar" />
                    </div>
                    <br />
                    <br />
                    <div class="coming-soon">Coming Soon:</div>
                    <br />
                    <br />
                    <br />
            </main>
                <footer>
                    <button onClick={props.handleSubmit} class="btn create-avatar-btn">
                        <img class="lamp" src="https://grammar-genie-nine.vercel.app/lamp.png" />
                        <span class="btn-text"> Get Started!</span>  
                    </button>
                </footer>
            </body>
        </html>

    </div>

  );

}