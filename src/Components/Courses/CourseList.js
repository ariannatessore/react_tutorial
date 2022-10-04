
import { useState } from 'react';
import { getCourseTerm,terms } from '../../Utilities/Utilities';
import { TermSelector } from '../Terms/TermSelector';
import { Course } from './Course';

const scheduleChanged = (selected, courses) => (
    selected.some(course => course !== courses[course.id])
  );

export const CourseList = ({ courses }) => {
    const [term, setTerm] = useState('Fall');
    const [selected, setSelected] = useState([]);
   console.log(courses,'corsi')
    if (scheduleChanged(selected, courses)) {
      setSelected([])
    };
    
    const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));
    
    return (
      <>
        <TermSelector term={term} setTerm={setTerm} />
        <div className="course-list">
        { 
          termCourses.map(course =>
            <Course key={ course.id } course={ course }
              selected={selected} setSelected={ setSelected } 
            />) 
        }
        </div>
      </>
    );
  };