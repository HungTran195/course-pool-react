import React, { useContext, useEffect, useState } from 'react';
import HeroSectionForHome from './HeroSectionForHome';
import CourseCard from '../../components/CourseCard/CourseCard';
import Spinner from '../../components/Spinner/Spinner';
import { notifyError } from '../../utils/notifications';
import { UserContext } from '../../components/UserContext';
import {CourseContext} from '../../components/CourseContext';

const HomePage = () => {
	const {
		courses,
		setCourses,
		searchKeywords,
		searchResults,
		isLoading,
		setIsLoading,
	} = useContext(CourseContext);

	const {user} = useContext(UserContext);
	useEffect(() => {
		document.title = 'Course Pool | Home Page'
		fetchAllCourses();
	}, [user]);

	const fetchAllCourses = ()=> {
		setIsLoading(true);

		fetch('api/view-course')
			.then(res => res.json())
			.then(data => {
				let courses = [];
				for (let i = 0; i < data.length; i++){
					courses.push(data[i]);
				}
				setCourses(courses);
				setIsLoading(false);
			})
			.catch(error =>{
				notifyError('Cannot load courses from server');
				setIsLoading(true);
				throw new Error('Error') 
			});
	}

	return (
		<>
			<HeroSectionForHome />
			<div className='container'>
				<div>
					{isLoading ? <Spinner /> : null}
				</div>
				<CourseCard allCourses={searchResults === undefined ? courses : searchResults} />
			</div>
		</>

	)
}

export default HomePage;