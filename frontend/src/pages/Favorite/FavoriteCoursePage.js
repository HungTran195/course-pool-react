import React, { useContext, useEffect, useState } from "react";
import HeroSectionForFavorite from "./HeroSectionForFavorite"
import CourseCard from "../../components/CourseCard/CourseCard";
import Spinner from "../../components/Spinner/Spinner";
import {UserContext} from "../../components/UserContext";
import { notifyError } from "../../utils/notifications";

const {REACT_APP_BASE_BACKEND_URL} = process.env;

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
        
		fetch(`${REACT_APP_BASE_BACKEND_URL}/api/get-favorite`,{
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',            
            },
        })
			.then(res => {
                return res.json()
            })
			.then(data => {
                if (data) {
                    let courses = [];
                    for (let i = 0; i < data.length; i++){
                        courses.push(data[i]);
                    }
                    setCourses(courses);
                }
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
