import { React, useState, useRef, useLayoutEffect, useEffect } from "react";
import {SketchPicker } from 'react-color'
import LineWidthPicker from 'react-line-width-picker'
import CanvasDraw from "react-canvas-draw";
import pencil from '../../Assets/Canvas/pencil.png';
import eraser from '../../Assets/Canvas/eraser.png';
import colorPicker from '../../Assets/Canvas/color-picker.png';
import widthPicker from '../../Assets/Canvas/width-picker.png';
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import Navbar from "./Navbar";
import undoIcon from '../../Assets/Canvas/undo.png';
import upArrow from '../../Assets/Canvas/up-arrow.png';
import downArrow from '../../Assets/Canvas/down-arrow.png';
import pencil_cursor from '../../Assets/Canvas/pencil_cursor.png'
import eraser_cursor from '../../Assets/Canvas/eraser_cursor.png'



const Canvas = (props) => {
    const [color, setColor] = useState("#000000");
    const [brushRadius, setBrushRadius] = useState(2);
    const [strokeColor, changeStrokeColor] = useState("#000000");
    const [strokeWidth, changeStrokeWidth] = useState(5);
    const [toolVisible, changeToolVisibility] = useState(true);
    const [colorPickerVisible, changeColorPickerVisiblity] = useState(false);
    const [widthPickerVisible, changeWidthPickerVisiblity] = useState(false);
    const [shapesVisible, changeShapesVisilbility] = useState(false);
    const [eraseMode, eraseModeToggle] = useState(false);
    const [saveableCanvas, setSavableCanvas] = useState("None");
    const [existingCanvas, setExistingCanvas] = useState(null);
    const [buttonDisabled, setPostDisabled] = useState(false);
    const [cursor, setCursor] = useState(pencil_cursor);

    useEffect(()=> {
        if(saveableCanvas !== "None"){
            onSnapshot(doc(db, "canvas", "KFJWEZPg2fEOh2Zxpk6N"), (doc) => {
                let canvas = doc.data().canvas;
                setExistingCanvas(canvas);
              });
        }
        
    }, [saveableCanvas]);

    const clearCanvas = () => {
        saveableCanvas.eraseAll();
        // console.log(saveableCanvas.getSaveData);
    }

    const toolsStyle = {

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
            setColor(color.hex);
        }
    }

    const togglePencil = () => {
        eraseModeToggle(false);
        setColor(strokeColor);
        setBrushRadius(strokeWidth);
        setCursor(pencil_cursor);
    }

    const toggleEraser = () => {
        eraseModeToggle(true);
        setColor("#FFFFFF");
        setBrushRadius(10);
        setCursor(eraser_cursor);
    }

    const handleWidthChangeComplete = (width) => {
        changeStrokeWidth(width);
        setBrushRadius(width);
    }

    const toogleTool = () => {
        changeToolVisibility(!toolVisible);
    }

    const post = () => {
        setPostDisabled(true);

        var tempCanvas = document.getElementById("tempCanvas");
        var context = tempCanvas.getContext("2d");
        var existingImage = new Image();
        existingImage.src = existingCanvas;
        var canvasImage = new Image();
        canvasImage.src = saveableCanvas.getDataURL();
        canvasImage.onload = function(){
            animate();
        };
    
          
        function animate(){
            var prom = new Promise(function(resolve){
                context.drawImage(existingImage,  0, 0, window.innerWidth, window.innerHeight);
                context.drawImage(canvasImage, 0, 0, window.innerWidth, window.innerHeight);
                console.log("tempCanvas.toDataURL('data/png')")
                console.log(tempCanvas.toDataURL('data/png'))
                resolve();
            });
            prom.then((value) => {
                updateDoc(doc(db, "canvas", "KFJWEZPg2fEOh2Zxpk6N"),{
                    canvas: tempCanvas.toDataURL('data/png'),
                }).then(setPostDisabled(false));
              });
        }
    }

    function DrawingTools () {
        if(toolVisible){
        return <div style={toolsStyle} >
                    <button onClick={togglePencil}><img src={pencil} style = {toolButtons}/></button>
                    <button onClick={toggleEraser}><img src={eraser} style = {toolButtons}/></button>
                    <button onClick={toggleColorPicker}><img src={colorPicker} style = {toolButtons}/></button>
                    <button onClick={toggleWidthPicker}><img src={widthPicker} style = {toolButtons}/></button>
                    <button onClick={undo}><img src={undoIcon} style = {toolButtons}/></button>
                    <button onClick={toogleTool}><img src={downArrow} style = {toolButtons}/></button>
                    <button onClick={clearCanvas}>clear</button> 
                    <button disabled={buttonDisabled}
                        onClick={post}
                    >POST</button>
                </div>
        }
        else{
            return <div style={ShowButtonObj}>
                <button onClick={toogleTool}><img src={upArrow} style = {toolButtons}/></button>
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
        saveableCanvas.undo();
    }
        
    return (
        <div style={{cursor: `url(${cursor}), auto`}}>
            <Navbar props={props}/>
            <canvas width={window.innerWidth} height={window.innerHeight} id="tempCanvas" hidden/>
            <CanvasDraw imgSrc={existingCanvas} loadTimeOffset = {0} hideGrid id="canvas"
            ref={canvasDraw => (setSavableCanvas(canvasDraw))}
            brushColor={color}
            brushRadius={brushRadius/2}
            lazyRadius={0}
            // enablePanAndZoom
            hideInterface
            canvasWidth={window.innerWidth}
            canvasHeight={window.innerHeight}
            />
            
            <DrawingTools />
            <ColorPicker />
            <WidthPicker/>
        </div>
    )
    
}

export default Canvas;