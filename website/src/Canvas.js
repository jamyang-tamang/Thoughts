import React from 'react';
import { useRef, useState, useLayoutEffect} from 'react';
import {SketchPicker } from 'react-color'
import LineWidthPicker from 'react-line-width-picker'
import 'react-line-width-picker/dist/index.css'
import pencil from './pencil.png';
import eraser from './eraser.png';
import colorPicker from './color-picker.png';
import widthPicker from './width.png';
import { signOut } from "firebase/auth";
import {auth} from './firebase-config'
import Button from '@mui/material/Button';

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
        backgroundColor: "skyblue",
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
                    <Button variant="contained" onClick={togglePencil}><img src={pencil} style = {toolButtons}/></Button>
                    <Button variant="contained" onClick={toggleEraser}><img src={eraser} style = {toolButtons}/></Button>
                    <Button variant="contained" onClick={toggleColorPicker}><img src={colorPicker} style = {toolButtons}/></Button>
                    <Button variant="contained" onClick={toggleWidthPicker}><img src={widthPicker} style = {toolButtons}/></Button>
                    <Button variant="contained" onClick={undo}>Undo</Button>
                    <Button variant="contained">Redo</Button>
                    <Button variant="contained" onClick={toogleText}>Text</Button>
                    <Button variant="contained">PaintBucket</Button>
                    <Button variant="contained" onClick={toggleShapes}>Shapes</Button>
                    <Button variant="contained" onClick={toogleTool}>hide</Button>
                    <Button variant="contained">pan</Button>
                    <Button variant="contained" onClick={clearCanvas}>clear</Button>
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
        // const cursor = document.querySelector(".cursor")
        // cursor.style.left = '${e.pageX}px'
        // cursor.style.top = '${e.pageY}px'
        // cursor.style.background = "cornflowerblue"
    };

    const logout = async () => {
        await signOut(auth);
        props.goToLogin();
    };
    
    return (
        // <div onMouseMove={(ev) => handleMouseMove(ev)}>
        <div>
            <div style = {{textAlign: "center"}}>
                <button onClick={props.goToDiscussions}>Discussions</button>
                <button onClick={props.goToMessages}>DMs</button>
                <button onClick={logout}>LogOut</button>
                <canvas id="canvas"
                    onMouseDown={penDown}
                    onMouseUp={penUp}
                    onMouseMove={penMove}
                />
            </div>
            <Cursor/>
            <ColorPicker />
            <WidthPicker/>
            <DrawingTools />
            <Shapes />
        </div>
    )
    
}

export default Canvas;




