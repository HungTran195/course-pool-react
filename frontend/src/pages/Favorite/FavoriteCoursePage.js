import React, { useContext, useEffect, useState } from "react";
import HeroSectionForFavorite from "./HeroSectionForFavorite"
import CourseCard from "../../components/CourseCard/CourseCard";
import Spinner from "../../components/Spinner/Spinner";
import {UserContext} from "../../components/UserContext";


const FavoriteCoursePage = () =>{
    const {user} = useContext(UserContext);
    const [courses, setCourses]= useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isLogIn, setIsLogIn] = useState(false);
    
    useEffect(() => {
        document.title = "Course Pool | Favorite Courses";        
        if(user.email){
            setIsLogIn(true);
            fetchFavoriteCourse();
        }
        else setIsLogIn(false);
    }, [user]);
  
    const fetchFavoriteCourse = ()=> {
		setIsFetching(true);
        
		fetch('api/get-favorite')
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
				notifyError(error);
				setIsFetching(true);
				throw new Error('Error') 
			});

	}
    
    return (
        <>
            <HeroSectionForFavorite hasUser={isLogIn} hasFavoriteCourse = {courses.length > 0 ? true : false} />
            <div className="container">
                <div>
                    {isFetching ? <Spinner /> : null}
                </div>
                <CourseCard allCourses={courses} />
            </div>
        </>
    )
}
export default FavoriteCoursePage;
