/*REACT*/
import { useState, useEffect } from 'react'; 

/*CSS FILES*/ 
import '../main.css';
import '../reset.css';


/*FIREBASE*/
//import db from '../firebase';

/*DAYBRUSH*/
import Moveable from 'react-moveable';


function CanvasApp() {

    const [target, setTarget] = useState();
    const [frame, setFrame] = useState({
        translate: [0,0],
    });

    useEffect(() => {
        setTarget(document.querySelector(".target"));
    }, []);
    

    return(

        <div className='main'>
            <section id='maindiv' className='section1'>
                <h1>Customise 2 page</h1>
                <div className="target">Target</div>

                <Moveable
                    target={ [].slice.call(document.querySelectorAll('.target')) }
                    container={null}
                    origin={true}

                    /* Resize event edges */
                    edge={false}

                    /* draggable */
                    draggable={true}
                    throttleDrag={0}
                    onDragStart={({ target, clientX, clientY }) => {
                        console.log("onDragStart", target);
                    }}
                    onDrag={({
                        target,
                        beforeDelta, beforeDist,
                        left, top,
                        right, bottom,
                        delta, dist,
                        transform,
                        clientX, clientY,
                    }) => {
                        console.log("onDrag left, top", left, top);
                        // target!.style.left = `${left}px`;
                        // target!.style.top = `${top}px`;
                        console.log("onDrag translate", dist);
                        target.style.transform = transform;
                    }}
                    onDragEnd={({ target, isDrag, clientX, clientY }) => {
                        console.log("onDragEnd", target, isDrag);
                    }}

                    /* When resize or scale, keeps a ratio of the width, height. */
                    keepRatio={false}

                    /* resizable*/
                    /* Only one of resizable, scalable, warpable can be used. */
                    resizable={true}
                    throttleResize={0}
                    onResizeStart={({ target , clientX, clientY}) => {
                        console.log("onResizeStart", target);
                    }}
                    onResize={({
                        target, width, height,
                        dist, delta, direction,
                        clientX, clientY,
                    }) => {
                        console.log("onResize", target);
                        delta[0] && (target.style.width = `${width}px`);
                        delta[1] && (target.style.height = `${height}px`);
                    }}
                    onResizeEnd={({ target, isDrag, clientX, clientY }) => {
                        console.log("onResizeEnd", target, isDrag);
                    }}

                    /* scalable */
                    /* Only one of resizable, scalable, warpable can be used. */
                    scalable={false}
                    throttleScale={0}
                    onScaleStart={({ target, clientX, clientY }) => {
                        console.log("onScaleStart", target);
                    }}
                    onScale={({
                        target, scale, dist, delta, transform,
                        clientX, clientY,
                    }) => {
                        console.log("onScale scale", scale);
                        target.style.transform = transform;
                    }}
                    onScaleEnd={({ target, isDrag, clientX, clientY }) => {
                        console.log("onScaleEnd", target, isDrag);
                    }}

                    /* rotatable */
                    rotatable={true}
                    throttleRotate={0}
                    onRotateStart={({ target, clientX, clientY }) => {
                        console.log("onRotateStart", target);
                    }}
                    onRotate={({
                        target,
                        delta, dist,
                        transform,
                        clientX, clientY,
                    }) => {
                        console.log("onRotate", dist);
                        target.style.transform = transform;
                    }}
                    onRotateEnd={({ target, isDrag, clientX, clientY }) => {
                        console.log("onRotateEnd", target, isDrag);
                    }}
                    // Enabling pinchable lets you use events that
                    // can be used in draggable, resizable, scalable, and rotateable.
                    pinchable={true}
                    onPinchStart={({ target, clientX, clientY, datas }) => {
                        // pinchStart event occur before dragStart, rotateStart, scaleStart, resizeStart
                        console.log("onPinchStart");
                    }}
                    onPinch={({ target, clientX, clientY, datas }) => {
                        // pinch event occur before drag, rotate, scale, resize
                        console.log("onPinch");
                    }}
                    onPinchEnd={({ isDrag, target, clientX, clientY, datas }) => {
                        // pinchEnd event occur before dragEnd, rotateEnd, scaleEnd, resizeEnd
                        console.log("onPinchEnd");
                    }}
                />
            </section>

        </div>
    )

}

export default CanvasApp;