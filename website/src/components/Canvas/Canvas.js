import { React, useState, useRef, useLayoutEffect, useEffect } from "react";
import {SketchPicker } from 'react-color'
import LineWidthPicker from 'react-line-width-picker'
import CanvasDraw from "react-canvas-draw";
import pencil from '../../Assets/Canvas/pencil.png';
import eraser from '../../Assets/Canvas/eraser.png';
import colorPicker from '../../Assets/Canvas/color-picker.png';
import widthPicker from '../../Assets/Canvas/width-picker.png';
import { doc, query, collection, where, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import Navbar from "./Navbar";

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
    const [saveableCanvas, setSavableCanvas] = useState(null);
    const [existingCanvas, setExistingCanvas] = useState(null);

    useEffect(()=> {
        if(saveableCanvas !== null){
            onSnapshot(doc(db, "canvas", "KFJWEZPg2fEOh2Zxpk6N"), (doc) => {
                let canvas = doc.data().canvas;
                setExistingCanvas(canvas);
                // saveableCanvas.loadSaveData(canvas);
                // localStorage.setItem("savedDrawing", saveableCanvas);
                console.log(canvas);
              });

        }
        console.log("This: " + saveableCanvas);
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
    }

    const toggleEraser = () => {
        eraseModeToggle(true);
        setColor("#FFFFFF");
        setBrushRadius(10);
    }

    const handleWidthChangeComplete = (width) => {
        changeStrokeWidth(width);
        setBrushRadius(width);
    }

    const toogleTool = () => {
        changeToolVisibility(!toolVisible);
    }

    const post = () => {
        // localStorage.setItem("savedDrawing", saveableCanvas);
        // console.log(saveableCanvas.getDataURL("jpg", true, "#ffffff"));

        // var image = new Image();
        // image.src = saveableCanvas.getDataURL();
        // console.log(image);
        updateDoc(doc(db, "canvas", "KFJWEZPg2fEOh2Zxpk6N"),{
            canvas: saveableCanvas.getDataURL(null, true),
        });
    }

    function DrawingTools () {
        if(toolVisible){
        return <div style={toolsStyle} >
                    <button onClick={togglePencil}><img src={pencil} style = {toolButtons}/></button>
                    <button onClick={toggleEraser}><img src={eraser} style = {toolButtons}/></button>
                    <button onClick={toggleColorPicker}><img src={colorPicker} style = {toolButtons}/></button>
                    <button onClick={toggleWidthPicker}><img src={widthPicker} style = {toolButtons}/></button>
                    <button onClick={undo}>Undo</button>
                    <button onClick={toogleTool}>hide</button>
                    <button onClick={clearCanvas}>clear</button> 
                    <button
                        onClick={post}
                    >POST</button>
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
        saveableCanvas.undo();
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
        <div >
            <Navbar props={props}/>
            <CanvasDraw imgSrc="https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg" loadTimeOffset = {0} hideGrid id="canvas"
            ref={canvasDraw => (setSavableCanvas(canvasDraw))}
            brushColor={color}
            brushRadius={brushRadius/2}
            lazyRadius={0}
            // enablePanAndZoom
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