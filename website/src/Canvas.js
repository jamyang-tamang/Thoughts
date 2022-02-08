import React, {Component} from 'react';
import { useRef, useState, useEffect} from 'react';
import {SketchPicker } from 'react-color'

const Canvas = (props) => {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [strokeColor, changeStrokeColor] = useState("#00000");
    const [toolVisible, changeToolVisibility] = useState(true);
    const [colorPickerVisible, changeColorPickerVisiblity] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = '${window.innerWidth}px';
        canvas.style.height = '${window.innerHeight}px';

        const context = canvas.getContext("2d")
        context.scale(1, 1)
        context.lineCap = "round"
        context.strokeStyle = strokeColor
        context.lineWidth = 5
        contextRef.current = context;
    }, [])

    const penDown = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
        console.log(strokeColor)
    }

    const clearCanvas = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    const penUp = () => {
        contextRef.current.closePath()
        setIsDrawing(false)
        console.log(strokeColor)
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
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        padding: "20px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "60px",
        width: "100%",
    }

    const drawingToolStyle = {
        position: "fixed",
        left: "0",
        bottom: "0",
    }

    const toogleTool = () => {
        changeToolVisibility(!toolVisible);
    }

    const colorPickerButton = () => {
        changeColorPickerVisiblity(!colorPickerVisible);
    }


    const handleChangeComplete = (color) => {
        changeStrokeColor(color.hex);
        console.log(color.hex);
    }
    
    function DrawingTools () {
        if(toolVisible){
        return <div style={styleObj}>
                    <button onClick={colorPickerButton}>ColorPicker</button>
                    <button>undo</button>
                    <button>redo</button>
                    <button>pencil</button>
                    <button>eraser</button>
                    <button>spray</button>
                    <button>pen</button>
                    <button>PaintBucket</button>
                    <button>strokeWidth</button>
                    <button onClick={toogleTool}>hide</button>
                    <button>pan</button>
                    <button onClick={clearCanvas}>clear</button>
                </div>
        }
        else{
            return <button onClick={toogleTool}>showTools</button>
        }
    }
    
    function ColorPicker () {
        if(colorPickerVisible){
            return <div style={drawingToolStyle}>
                        <SketchPicker 
                        color = {strokeColor}
                        onChangeComplete= {handleChangeComplete}
                        />
                     </div>
        }
        return 0
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
            <ColorPicker />
            <DrawingTools />
        </div>
    )
    
}

export default Canvas;




