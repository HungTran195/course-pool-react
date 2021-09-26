import React, {useState} from "react";
import PropTypes from 'prop-types';

export const CourseContext = React.createContext({
    courses: [],
    setCourses: () => {},
    searchKeywords: '',
    setSearchKeywords: () => {},
    searchResults: undefined,
    setSearchResults: () => {},
    isLoading: false,
    setIsLoading: () => {},
});

const CourseProvider = ({children}) => {
    const [courses, setCourses] = useState([]);
    const [searchKeywords, setSearchKeywords] = useState('');
    const [searchResults, setSearchResults] = useState(undefined);
    const [isLoading, setIsLoading] = useState(undefined);

    return (
        <CourseContext.Provider value ={{
            courses,
            setCourses,
            searchKeywords,
            setSearchKeywords,
            searchResults,
            setSearchResults,
            isLoading,
            setIsLoading
        }}
        >
            {children}
        </CourseContext.Provider>
    )
}

CourseProvider.prototype = {
    children: PropTypes.node.isRequired,
};

export default CourseProvider;