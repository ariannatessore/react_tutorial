import React from 'react';
import './App.css';
import {Banner} from './Components/Banner.js';
import { addScheduleTimes } from './Utilities/Utilities';
import { CourseList } from './Components/Courses/CourseList';
import { useData } from '../src/Utilities/firebase';



// const schedule = {
//   "title": "CS Courses for 2018-2019",
//   "courses": {
//     "F101" : {
//       "id" : "F101",
//       "meets" : "MWF 11:00-11:50",
//       "title" : "Computer Science: Concepts, Philosophy, and Connections"
//     },
//     "F110" : {
//       "id" : "F110",
//       "meets" : "MWF 10:00-10:50",
//       "title" : "Intro Programming for non-majors"
//     },
//     "S313" : {
//       "id" : "S313",
//       "meets" : "TuTh 15:30-16:50",
//       "title" : "Tangible Interaction Design and Learning"
//     },
//     "S314" : {
//       "id" : "S314",
//       "meets" : "TuTh 9:30-10:50",
//       "title" : "Tech & Human Interaction"
//     }
//   }
// };


const App = () => {
  
  const [schedule, loading, error] = useData(data => addScheduleTimes(data)); 
  
   
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>
 console.log(schedule,'shec')
  return (

    <div className="container">
    
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule } />
    </div>
  );
};


export default App;



