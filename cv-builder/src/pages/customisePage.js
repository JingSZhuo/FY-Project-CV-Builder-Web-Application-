/*CSS FILES*/ 
import '../main.css';
import '../reset.css';

/*PACKAGES*/
import interact from 'interactjs'; 

/*FIREBASE*/
import { getDatabase, onValue, ref, update } from 'firebase/database';
import db from '../firebase';
import { useEffect, useState } from 'react';


function CustomiseApp () {

    //STATES + USEEFFECT

    //UseStates default values
    const [data, setData] = useState([])
    const [count, setCount] = useState(0)
    //const [intial, setInitial] = useState(0)

    
    useEffect(() => {                               //When page is initially loaded/refreshed 
        function readData (db) {
            const data = getDatabase(db)
            let reference = ref(data, 'user/object')
    
            onValue(reference, (snapshot) => {
                const B = JSON.stringify(snapshot.val())
                const A = JSON.parse(B)
                console.log("A:",A)
                setData(A)         //Update state data
                setCount(A.length) 
                //setInitial(1)
            } , 
            {onlyOnce: true})
        }
        readData(db)

        //loadElements()
    }, []) //count dependency to render the page to load elements

    //JavaScript Library for drag and resize function

    /******************************************JAVASCRIPT LIBRARIES*******************************************/

    interact('.resize-drag')
        .resizable({
            // resize from all edges and corners
            edges: { left: true, right: true, bottom: true, top: true },
        
            listeners: {
                move (event) {
                        var target = event.target
                        var x = (parseFloat(target.getAttribute('data-x')) || 0)
                        var y = (parseFloat(target.getAttribute('data-y')) || 0)
                
                        // update the element's style
                        target.style.width = event.rect.width + 'px'
                        target.style.height = event.rect.height + 'px'
                
                        // translate when resizing from top or left edges
                        x += event.deltaRect.left
                        y += event.deltaRect.top
                
                        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'
                
                        target.setAttribute('data-x', x)
                        target.setAttribute('data-y', y)
                        target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)

                        UpdateRealTimeDB(db)                //update DB, when a new element is created, this function is also called
                    },
                dragMoveListener,
                },
            modifiers: [
            // keep the edges inside the parent
            interact.modifiers.restrictEdges({
                outer: 'parent'
            }),
        
            // minimum size
            interact.modifiers.restrictSize({
                min: { width: 100, height: 50 }
            })
            ],
        })
        .draggable({
            listeners: { 
                move: window.dragMoveListener,  

                end (event) {
                    UpdateRealTimeDB(db)        //Update the DB everytime a action is performed
                }
                    
            },
            inertia: true,
            modifiers: [
              interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
              })
            ]
        })

    function dragMoveListener (event) {
            var target = event.target
            // keep the dragged position in the data-x/data-y attributes
            var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
            var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
            
            // translate the element
            target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
            
            // update the posiion attributes
            target.setAttribute('data-x', x)
            target.setAttribute('data-y', y)
            target.style.color = "white"

            //UpdateRealTimeDB(db)        //Update the DB everytime a action is performed
        }
        
    // this function is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener

    
    /******************************************JAVASCRIPT LIBRARIES*******************************************/


    function UpdateRealTimeDB (db) {                //Call this everytime to update the Database
        let x = document.getElementsByClassName("resize-drag").length
       // console.log("length: ",x)
        const object = {}                                        //Object created
        for (let index = 0; index < x; index++) {
            let y = document.getElementsByClassName("resize-drag")[index].outerHTML     
            object[index] = y                                   //objectName["property name"] = property value
            if ( object[index] == null ) {console.log("null found")}
        }

        //update database
        let dbReference = getDatabase(db)
        update(ref(dbReference, 'user/object'), object)

        return object
    }

    function loadElements() {       //When called, it will load data from database via the data usestate
        let len = count
        if (count === 0) { return false }
        for (let index = 0; index < len; index++) {
            const divv = document.createElement("div")

            const parent = document.getElementById('maindiv')
            parent.appendChild(divv)
            divv.outerHTML = data[index]
        }
        console.log("len", count)
        document.getElementById('load').disabled = true;
    }

    function createElement() {                //Write into database a new element 
        const divv = document.createElement("div")

        const defaultInnerDiv = '<div class="resize-drag" style="transform: translate(35.7335px, 41.8653px); width: 150px; height: 99.9688px; cursor: move;" data-x="35.733471313331904" data-y="41.86525782767984">150×100</div>'

        const parent = document.getElementById('maindiv')
        parent.appendChild(divv)
        divv.outerHTML = defaultInnerDiv 

        console.log(divv.outerHTML)
    }

    // function myFunction(event) { 
    //     event.target.style.color = "red";
    // }

    
    return(
        <div className='main'>
            <section id='maindiv' className='section1'>
                <h1>Customise page</h1>

                {/* <button onClick={() => { UpdateRealTimeDB(db)}}>Create</button> */}
                <button onClick={() => { createElement()}}>Create</button>
                <button id='load' onClick={() => { loadElements()}}>Load</button>

            </section>

        </div>
    )
}

export default CustomiseApp;