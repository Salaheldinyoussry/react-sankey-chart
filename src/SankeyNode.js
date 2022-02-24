import React, { useEffect, useState } from "react";
import './CJ.css'

function SankeyNode({image , width, height , color,title , id ,styles}) {







    return (

           
            <div id={id} style={ styles}>
                {image?
                < img style={{ width: '80%', height: '80%',margin: '5px'}} src={image}></img>
               :
            <div style={{ borderRadius: '50%', width: '60%', height: '60%', alignSelf: 'center', backgroundColor:'rgba(100,100,100,0.15)'  }}></div>
                }
                <h6 
                 style={{
                     position: 'absolute',
                    transform: 'translate(0px,-44px)'
                 }}
                >{title}</h6>
            </div>

    );
}

export default SankeyNode;
