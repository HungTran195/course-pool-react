import React, { useContext, useEffect, useState } from 'react';
import HeroSectionForHome from './HeroSectionForHome';
import CourseCard from '../../components/CourseCard/CourseCard';
import Spinner from '../../components/Spinner/Spinner';
import { notifyError } from '../../utils/notifications';
import { UserContext } from '../../components/UserContext';

const HomePage = () => {
	const [courses, setCourses]= useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const {user} = useContext(UserContext);
	useEffect(() => {
		document.title = 'Course Pool | Home Page'
		fetchAllCourses();
	}, [user]);

	const fetchAllCourses = ()=> {
		setIsFetching(true);

		fetch('api/view-course')
			.then(res => res.json())
			.then(data => {
				let courses = [];
				for (let i = 0; i < data.length; i++){
					courses.push(data[i]);
				}
				setCourses(courses);
				setIsFetching(false);
			})
			.catch(error =>{
				notifyError('Cannot load courses from server');
				setIsFetching(true);
				throw new Error('Error') 
			});

	}

	return (
		<>
			<HeroSectionForHome />
			<div className='container'>
				<div>
					{isFetching ? <Spinner /> : null}
				</div>
				<CourseCard allCourses={courses} />
			</div>
		</>

	)
}

export default HomePage;