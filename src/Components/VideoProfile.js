import React from 'react'

export default function VideoProfile(props) {
    const playMovie=(e)=>{
        e.target.play();
        e.target.muted=false;
        console.log("on");

    }
    const stopMovie=(e)=>{
        e.target.pause();
        e.target.load();
        console.log("off");
    }
    return (
        <>
            <video onMouseOver={playMovie} onMouseOut={stopMovie} src={props.src} muted="muted" style={{
                height:'100%',
                width:'100%',
                objectFit:'contain'
            }}></video>
        </>
    )
}
