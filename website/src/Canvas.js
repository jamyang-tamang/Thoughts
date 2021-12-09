import React from 'react';
import { useRef, useState, useEffect, StyleSheet } from 'react';

const Canvas = (props) => {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = '${window.innerWidth}px';
        canvas.style.height = '${window.innerHeight}px';

        const context = canvas.getContext("2d")
        context.scale(1, 1)
        context.lineCap = "round"
        context.strokeStyle = "black"
        context.lineWidth = 5
        contextRef.current = context;
    }, [])

    const penDown = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }

    const penUp = () => {
        contextRef.current.closePath()
        setIsDrawing(false)
    }

    const penMove = ({nativeEvent}) => {
        if (!isDrawing) {
            return
        }
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
    }

    const styleObj = {
        backgroundColor: "grey",
        textAlign: "center",
        padding: "10px",
    }
    return (
        <div>
            <button onClick={props.goToDiscussions}>Discussions</button>
            <button onClick={props.goToMessages}>DMs</button>
            <canvas
                onMouseDown={penDown}
                onMouseUp={penUp}
                onMouseMove={penMove}
                ref={canvasRef}
            />
            <div style={styleObj}>
                asdfh
            </div>

        </div>
    )
}

export default Canvas;




