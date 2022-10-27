/*CSS FILES*/ 
import '../main.css';
import '../reset.css';

/*PACKAGES*/
import interact from 'interactjs'; 

/*FIREBASE*/
import { getDatabase, ref, set } from 'firebase/database';
import db from '../firebase';


function CustomiseApp () {

    const position = { x: 0, y: 0 }

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

    function testFunction(db) {
        console.log("function success")
        const data = getDatabase(db)
        set(ref( data, 'user/'), {
            username: "lol",
            outerDiv: "some...div...changed",
            empty: "" ,
        });
    }


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
                <button onClick={() => { testFunction(db)}}>Click</button>

            </section>

        </div>
    )
}

export default CustomiseApp;