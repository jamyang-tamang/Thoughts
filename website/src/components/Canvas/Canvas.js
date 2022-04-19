import { React, useState, useRef, useLayoutEffect } from "react";
import {SketchPicker } from 'react-color'
import LineWidthPicker from 'react-line-width-picker'
import CanvasDraw from "react-canvas-draw";
import pencil from '../../Assets/Canvas/pencil.png';
import eraser from '../../Assets/Canvas/eraser.png';
import colorPicker from '../../Assets/Canvas/color-picker.png';
import widthPicker from '../../Assets/Canvas/width-picker.png';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const Canvas = (props) => {
    const [color, setColor] = useState("#ffc600");
    const [brushRadius, setBrushRadius] = useState(5);
    const [strokeColor, changeStrokeColor] = useState("#000000");
    const [strokeWidth, changeStrokeWidth] = useState(5);
    const [toolVisible, changeToolVisibility] = useState(true);
    const [colorPickerVisible, changeColorPickerVisiblity] = useState(false);
    const [widthPickerVisible, changeWidthPickerVisiblity] = useState(false);
    const [shapesVisible, changeShapesVisilbility] = useState(false);
    const [eraseMode, eraseModeToggle] = useState(false);
    const [saveableCanvas, setSavableCanvas] = useState(null);

    useLayoutEffect(()=> {
        if(saveableCanvas!= null){
            getDoc(doc(db, "canvas", "KFJWEZPg2fEOh2Zxpk6N")).then(docSnap => {
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    let canvas = docSnap.data().canvas.toString();
                    console.log(canvas);
                    saveableCanvas.loadSaveData(canvas);
                } 
                
                else {
                // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
        }
    }, [saveableCanvas]);

    const clearCanvas = () => {
        saveableCanvas.eraseAll();
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

    //     document.querySelector('cursor').style.url("pencil_cursor.png");
    //     // document.querySelector('[cursor=pointer]').style.url("pencil_cursor.png");
    }

    const toggleEraser = () => {
        eraseModeToggle(true);
        setColor("#FFFFFF");
        setBrushRadius("10");
    }

    // const toogleText = () => {
    // }

    const handleWidthChangeComplete = (width) => {
        changeStrokeWidth(width);
        setBrushRadius(width);
    }

    const toogleTool = () => {
        changeToolVisibility(!toolVisible);
    }

    const post = () => {
        // localStorage.setItem(
        //     "savedDrawing",
        //     saveableCanvas.getSaveData()
        //   );
        console.log(localStorage.getItem("savedDrawing"));
        updateDoc(doc(db, "canvas", "KFJWEZPg2fEOh2Zxpk6N"),{
            canvas: saveableCanvas.getSaveData(),
        });
    }

    // const load = () => {
    //     console.log(localStorage.getItem("savedDrawing"));
    //     setSavableCanvas(localStorage.getItem("savedDrawing"));
    // }

    function DrawingTools () {
        if(toolVisible){
        return <div style={toolsStyle} >
                    <button onClick={togglePencil}><img src={pencil} style = {toolButtons}/></button>
                    <button onClick={toggleEraser}><img src={eraser} style = {toolButtons}/></button>
                    <button onClick={toggleColorPicker}><img src={colorPicker} style = {toolButtons}/></button>
                    <button onClick={toggleWidthPicker}><img src={widthPicker} style = {toolButtons}/></button>
                    <button onClick={undo}>Undo</button>
                    <button>Redo</button>
                    {/* <button onClick={toogleText}>Text</button> */}
                    <button onClick={toogleTool}>hide</button>
                    <button>pan</button>
                    <button onClick={clearCanvas}>clear</button> 
                    <button
                        onClick={post}
                    >POST</button>
                    {/* <button
                    onClick={load}                        
                    >Load</button> */}
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
        // <div onMouseMove={(ev) => handleMouseMove(ev)}>

        

        // <button
        //     onClick={() => {
        //       this.saveableCanvas.eraseAll();
        //     }}
        //   >
        //     Erase
        //   </button>

       
        <div >
            <div style = {{textAlign: "center"}}>
                <button onClick={props.goToDiscussions}>Discussions</button>
                <button onClick={props.goToMessages}>DMs</button>
                <button onClick={props.logout}>logout</button>
                <CanvasDraw hideGrid id="canvas"
                ref={canvasDraw => (setSavableCanvas(canvasDraw))}
                brushColor={color}
                brushRadius={brushRadius}
                lazyRadius={0}
                canvasWidth={window.innerWidth}
                canvasHeight={window.innerHeight}
                />
            </div>
            <DrawingTools />
            <ColorPicker />
            <WidthPicker/>
        </div>
    )
    
}

export default Canvas;




