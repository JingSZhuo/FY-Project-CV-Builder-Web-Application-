/* CSS FILES */ 
import '../main.css';
import '../reset.css';

/* FIREBASE */
import { getDatabase, onValue, ref, update } from 'firebase/database';
import db from '../firebase';
import { useEffect, useState } from 'react';

/* COMPONENTS AND PAGES */


const QuestionnairePage = () => {
    return ( 
        <body>

            <div>
                <h1>Questionnaire</h1>
            </div>

        </body>
    );
}
 
export default QuestionnairePage;