import React from 'react';
import { useRef, useState, useLayoutEffect} from 'react';
import {SketchPicker } from 'react-color'
import LineWidthPicker from 'react-line-width-picker'
import 'react-line-width-picker/dist/index.css'
import pencil from './pencil.png';
import eraser from './eraser.png';
import colorPicker from './color-picker.png';
import widthPicker from './width.png';

const Canvas = (props) => {
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [strokeColor, changeStrokeColor] = useState("#000000");
    const [strokeWidth, changeStrokeWidth] = useState(5);
    const [toolVisible, changeToolVisibility] = useState(true);
    const [colorPickerVisible, changeColorPickerVisiblity] = useState(false);
    const [widthPickerVisible, changeWidthPickerVisiblity] = useState(false);
    const [shapesVisible, changeShapesVisilbility] = useState(false);
    const [eraseMode, eraseModeToggle] = useState(false);
    const [textMode, textModeToggle] = useState(false);
    const drawings = []

    // const [cursor, setCursor] = useState('pointer');
    useLayoutEffect(() => {
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
    }, [])

    const penDown = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }

    const clearCanvas = () => {
        const context = contextRef.current;
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
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
        // cursor: cursor,
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
        position: "fixed",
        border: '2px solid black',
        background: "#36454F",
        left: "30px",
        bottom: "60px",
    }

    const toolButtons = {
        height: "20px",
         width: "20px",
    }

    const handleColorChangeComplete = (color) => {
        changeStrokeColor(color.hex);
        if(!eraseMode){
            const context = contextRef.current;
            context.strokeStyle = (color.hex);
        }
    }

    const togglePencil = () => {
        // cursor: url("pencil_cursor.png"), auto;
        eraseModeToggle(false);

        console.log(strokeColor);
        console.log(strokeWidth);
        const context = contextRef.current;
        context.strokeStyle = (strokeColor);
        context.lineWidth = (strokeWidth);
        console.log(eraseMode);

        document.querySelector('cursor').style.url("pencil_cursor.png");
        // document.querySelector('[cursor=pointer]').style.url("pencil_cursor.png");
    }

    const toggleEraser = () => {
        eraseModeToggle(true);
        const context = contextRef.current;
        context.strokeStyle = ("#FFFFFF");
        context.lineWidth = (22);
    }

    const toogleText = () => {
    }

    const handleWidthChangeComplete = (width) => {
        changeStrokeWidth(width);
        const context = contextRef.current;
        context.lineWidth = (width);
    }

    const toogleTool = () => {
        changeToolVisibility(!toolVisible);
    }

    const cursorStyle = {
        width: "30rem",
        height: "30rem",
        border: "2px solid black",
        borderRadius: "50%",
        position: "absolute",
        transform: "translate (-50%, -50%)",
        zIndex: "999",
        back: "red",
        // pointer-events: none,
        // transition: all 0.2s ease;
        // transition-property: background border transform,
        // transform-origin: 150% 150%;
        
    }

    function Cursor(){ return <div style={cursorStyle}></div>;}

    function DrawingTools () {
        if(toolVisible){
        return <div style={styleObj} >
                    <button onClick={togglePencil}><img src={pencil} style = {toolButtons}/></button>
                    <button onClick={toggleEraser}><img src={eraser} style = {toolButtons}/></button>
                    <button onClick={toggleColorPicker}><img src={colorPicker} style = {toolButtons}/></button>
                    <button onClick={toggleWidthPicker}><img src={widthPicker} style = {toolButtons}/></button>
                    <button onClick={undo}>Undo</button>
                    <button>Redo</button>
                    <button onClick={toogleText}>Text</button>
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

    function handleMouseMove(ev) { 
        const cursor = document.querySelector(".cursor")
        cursor.style.left = '${e.pageX}px'
        cursor.style.top = '${e.pageY}px'
        cursor.style.background = "cornflowerblue"
    };
    
    return (
        <div onMouseMove={(ev) => handleMouseMove(ev)}>
            <button onClick={props.goToDiscussions}>Discussions</button>
            <button onClick={props.goToMessages}>DMs</button>
            <canvas id="canvas"
                onMouseDown={penDown}
                onMouseUp={penUp}
                onMouseMove={penMove}
            />
            <Cursor/>
            <ColorPicker />
            <WidthPicker/>
            <DrawingTools />
            <Shapes />
        </div>
    )
    
}

export default Canvas;




