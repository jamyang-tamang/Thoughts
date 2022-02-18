import React, {Component} from 'react';
import { useRef, useState, useLayoutEffect} from 'react';
import context from 'react-bootstrap/esm/AccordionContext';
import { getOverlayDirection } from 'react-bootstrap/esm/helpers';
import {SketchPicker } from 'react-color'
import LineWidthPicker from 'react-line-width-picker'
import 'react-line-width-picker/dist/index.css'

const Canvas = (props) => {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [strokeColor, changeStrokeColor] = useState("#00000");
    const [strokeWidth, changeStrokeWidth] = useState(5);
    const [toolVisible, changeToolVisibility] = useState(true);
    const [colorPickerVisible, changeColorPickerVisiblity] = useState(false);
    const [widthPickerVisible, changeWidthPickerVisiblity] = useState(false);
    const [shapesVisible, changeShapesVisilbility] = useState(false);
    const drawings = []

    useLayoutEffect(() => {
        async function drawCanvas(){
            const canvas = document.getElementById('canvas');
            const context = canvas.getContext("2d");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.width = '${window.innerWidth}px';
            canvas.style.height = '${window.innerHeight}px';

            context.scale(1, 1)
            context.lineCap = "round"
            context.strokeStyle = strokeColor
            context.lineWidth = strokeWidth
            contextRef.current = context;
        }
        drawCanvas();
    }, [])

    const penDown = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }

    const clearCanvas = () => {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
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
        drawings.push(contextRef.current)
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

    const ShowButtonObj = {
        textAlign: "center",
        padding: "20px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "60px",
        width: "100%",
    }

    const drawingToolStyle = {
        position: "absolute",
        left: "30px",
        bottom: "30px",
    }

    const handleColorChangeComplete = (color) => {
        changeStrokeColor(color.hex);
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext("2d");
        context.strokeStyle = (color.hex);
    }

    const togglePencil = () => {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext("2d");
        context.strokeStyle = (strokeColor);
        context.lineWidth = (strokeWidth);

        console.log(strokeColor);
        console.log(strokeWidth);
    }

    const toggleEraser = () => {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext("2d");
        context.strokeStyle = ("#FFFFFF");
        context.lineWidth = (22);

        console.log(strokeColor);
        console.log(strokeWidth);
    }

    const handleWidthChangeComplete = (width) => {
        changeStrokeWidth(width);
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext("2d");
        context.lineWidth = (width);
    }

    const toogleTool = () => {
        changeToolVisibility(!toolVisible);
    }
    
    function DrawingTools () {
        if(toolVisible){
        return <div style={styleObj}>
                    <button onClick={toggleColorPicker}>ColorPicker</button>
                    <button onClick={toggleWidthPicker}>strokeWidth</button>
                    <button onClick={undo}>undo</button>
                    <button>redo</button>
                    <button onClick={togglePencil}>pencil</button>
                    <button onClick={toggleEraser}>eraser</button>
                    <button>spray</button>
                    <button>PaintBucket</button>
                    <button onClick={toggleShapes}>Shapes</button>
                    <button onClick={toogleTool}>hide</button>
                    <button>pan</button>
                    <button onClick={clearCanvas}>clear</button>
                </div>
        }
        else{
            return <div style={ShowButtonObj}>
                <button onClick={toogleTool}>showTools</button>
            </div>
        }
    }
    
    const toggleColorPicker = () => {
        changeColorPickerVisiblity(!colorPickerVisible);
        changeWidthPickerVisiblity(false);
    }

    function ColorPicker () {
        if(colorPickerVisible){
            return <div style={drawingToolStyle}>
                        <SketchPicker 
                        color = {strokeColor}
                        onChange= {handleColorChangeComplete}
                        />
                     </div>
        }
        return null
    }

    
    const toggleWidthPicker = () => {
        changeWidthPickerVisiblity(!widthPickerVisible);
        changeColorPickerVisiblity(false);
    }
    function WidthPicker () {
        if(widthPickerVisible){
            return <div style={drawingToolStyle}>
                        <LineWidthPicker 
                        onClick= {handleWidthChangeComplete}
                        background= {"#808080"}
                        />
                     </div>
        }
        return null
    }

    const undo = () => {
    }

    const toggleShapes = () => {
        changeShapesVisilbility(!shapesVisible);
    }

    function Shapes (){
        if(shapesVisible){
            return <div style={drawingToolStyle}>
                <button>Rectangle</button>
                <button>Circle</button>
            </div>
        }
        return 0
    }
    
    return (
        <div>
            <button onClick={props.goToDiscussions}>Discussions</button>
            <button onClick={props.goToMessages}>DMs</button>
            <canvas id="canvas"
                onMouseDown={penDown}
                onMouseUp={penUp}
                onMouseMove={penMove}
            />
            <ColorPicker />
            <WidthPicker/>
            <DrawingTools />
            <Shapes />
        </div>
    )
    
}

export default Canvas;




