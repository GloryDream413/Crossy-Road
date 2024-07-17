import React from 'react';

const LandingScreen = () => {
    const createStars = () => {
        const stars = [];
        for (let i = 0; i < 200; i++) {
            stars.push(
                <div
                    key={i}
                    className="star"
                    style={{
                        top: `${-Math.random() * 200}vh`,
                        left: `${-Math.random() * 200}vw`,
                        animationDelay: `${Math.random() * 1}s`
                    }}
                ></div>
            );
        }
        return stars;
    };

    return (
        <div className="landing-screen" style={{
            position: 'relative',
            overflow: 'hidden',
            height: '100vh',
            background: 'black'
        }}>
            {createStars()}

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
            }}>
                <h1 className="title" >The Road to Valhalla !</h1>

                <button className="decoration-button" onClick={() => { /* Add your button click logic here */ }}>PLAY SINGLE</button>
                <button className="decoration-button" onClick={() => { /* Add your button click logic here */ }}>CREATE SERVER</button>
                <button className="decoration-button" onClick={() => { /* Add your button click logic here */ }}>JOIN SERVER</button>
            </div>
        </div>
    );
};

export default LandingScreen;

// CSS styles
const styles = `
    .star {
        position: absolute;
        background-color: white;
        border-radius: 50%;
        width: 3px;
        height: 3px;
        animation: starAnimation 5s linear infinite;
    }

    @keyframes starAnimation {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(150vw, 150vh) scale(0.9);
            opacity: 1;
        }
    }

    .title {
        color : white;
        font-size : 40px;
        margin-bottom : 50px;
        transition : all 2s;
        transform : scale(1);
        cursor : pointer;
    }
    
    .title:hover{
        transition : all 2s;
        transform : scale(1.2);
        cursor : pointer;
    }

    .decoration-button {
        background-color: transparent;
        color: white;
        border: 2px solid white;
        padding: 10px 20px;
        font-size: 16px;
        margin: 10px;
        cursor: pointer;
        transition: all 0.3s;
        width : 250px;
    }

    .decoration-button:hover {
        background-color: rgba(255,255,255,0.1);
        color : white;
        border : 2px solid green;
        transition : 1s all;
        transform : scale(1.1);
    }

    @keyframes glow {
        0% {
            text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 60px #ff00de, 0 0 70px #ff00de;
        }
        100% {
            text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 60px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de;
        }
    }

    h1 {
        color: white;
        font-size: 40px;
        animation: glow 1s infinite alternate;
    }


`;

const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
