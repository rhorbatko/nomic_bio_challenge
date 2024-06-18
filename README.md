# sw-fullstack-coding-challenge
## Goal
1. Add a new umap feature to the existing web app. 
2. Fix a bug (details TDB)

## UMAP Feature
See this wireframe for UI details.

Feature Requirements
- A user should be able to select a dataset and visualize the associated UMAP plot points in a scatter plot. 
- A user should be able to filter which points appear based on their associated metadata (ex, only showing plot points for Donor 1).
- A user should be able to colour the plot points based on the signal level for an associated target (ex, user can select APRIL and the plot points will be coloured using a continous gradient based on the linked SampleSignals with target=APRIL). 

Tech stack requirements
- CSS styling should be done using [tailwind](https://tailwindcss.com/). 
- Endpoints should be written using [django-rest-framework](https://www.django-rest-framework.org/). The Dataset endpoint gives a good example of written endpoints, serializers, and tests using the framework
- Graphs should use [plotly js](https://plotly.com/javascript/react/)

A react page has already been created at `fronted/src/app/umap` to contain the feature. 

## Running Instructions
Frontend from root directory
```
cd frontend
yarn install
yarn dev
```
Backend from the root directory (assumes using Linux)
```
python -m venv venv
source venv/bin/activate
pip install pipenv
pipenv install
pipenv install --dev
cd graphing_app
python manage.py reset_db
python manage.py migrate
python manage.py add_dev_data
python manage.py runserver
```