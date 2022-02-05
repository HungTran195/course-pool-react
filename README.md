# course-pool-react
![Badge](https://img.shields.io/badge/python-3.8.7-0?logo=Python&color=blue)
![Badge](https://img.shields.io/badge/django-3.2-0?logo=Django&color=success)

A Django-React Version of [Coursepool](https://github.com/QuocHung52/course_pool)

![Alt Text](https://github.com/QuocHung52/quochungtran/blob/master/img/CoursePool.png) 



Course Pool is a place where you get greate free learning courses on the internet with variety of languages. Share your favorite course to the world and help us extend the library

This is a starter project, completed project can be seen [here](https://course-pool.netlify.app/)


## Installation & Set up

#### Setup for Backend environment
1. Navigate to backend directory
2. Install requirement: ```pip install -r requirements.txt```  (you should create a virtual environment for this project)
3. Rename <em>.env_example</em> file to <em>.env</em>
4. Run ```python manage.py migrate```  to apply all migrations
5. Run backend: ``` python manage.py runserver ``` (backend should run in http://127.0.0.1:8000/ by default)

#### Setup for Frontend environment
1. Navigate to frontend directory
2. Run ```npm install``` to install all dependencies
3. Rename <em>.env_example</em> file to <em>.env</em>
4. Run ```npm start``` to run frontend (frontend should run in http://localhost:3000/ by default)

<em>Note: you need to keep both backend and frontend running.</em>

#### New version of django - react: https://github.com/QuocHung52/course-pool-react
