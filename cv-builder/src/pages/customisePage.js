/*CSS FILES*/ 
import '../main.css';
import '../reset.css';

/*PACKAGES*/
import interact from 'interactjs'; 

/*FIREBASE*/
import { get, getDatabase, onValue, ref, set, update } from 'firebase/database';
import db from '../firebase';
import { useEffect, useState } from 'react';


function CustomiseApp () {

    //STATES

    const [data, setData] = useState([])

    // target elements with the "draggable" class
    interact('.draggable')
        .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
            interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
            })
        ],
        // enable autoScroll
        autoScroll: true,

        listeners: {
            // call this function on every dragmove event
            
            move: dragMoveListener,

            // call this function on every dragend event
            end (event) {
            var textEl = event.target.querySelector('p')

            textEl && (textEl.textContent =
                'moved a distance of ' +
                (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                        Math.pow(event.pageY - event.y0, 2) | 0))
                .toFixed(2) + 'px')

            GetClass(db)  //Update every move

            }
        }
    })

    function dragMoveListener (event) {

        let target = event.target
        // keep the dragged position in the data-x/data-y attributes
        let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
        let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

        // translate the element
        target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

        // update the posiion attributes
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
    }

    // this function is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener

    function GetClass (db) {
        let x = document.getElementsByClassName("draggable").length
        console.log("lenght: ",x)
        const object = {}
        for (let index = 0; index < x; index++) {
            let y = document.getElementsByClassName("draggable")[index].outerHTML
            object[index] =  y
        }
        //console.log(object)

        let z = getDatabase(db)
        update(ref(z, 'user/object'), object)

        return object
    }

    function testFunction(db) {

        console.log("function success")

        const data = getDatabase(db)
        set(ref( data, 'user/'), {
            username: "lol",
            outerDiv: "some...div...changed",
            empty: "" ,
            object : {
                empty: "...empty...",
                0: "changed...",
                1: "xd", 
                2: "testing...",
            },
        });
    }

    useEffect(() => {
        function readData (db) {
            const data = getDatabase(db)
            let reference = ref(data, 'user/object')
    
            onValue(reference, (snapshot) => {
                const B = JSON.stringify(snapshot.val())
                const A = JSON.parse(B)
                console.log(A)
                
                setData(snapshot.val())
            }, 
            {onlyOnce: true})
        }
        readData(db)
    }, [])

    console.log("Data: ", data)

    return(
        <div className='main'>
            <section className='section1'>
                <h1>Customise page</h1>

                <div  class="draggable">
                    <p> ...</p>
                </div>
                <div class="draggable">
                    <p> ...</p>
                </div>

                {/* {data.map((data) => {
                    return(
                        
                        <div> {data.empty}</div>
                    )
                })} */}


                <button onClick={() => { testFunction(db)}}>Post</button>
                <button onClick={() => { GetClass(db)}}>Change</button>

            </section>

        </div>
    )
}

export default CustomiseApp;