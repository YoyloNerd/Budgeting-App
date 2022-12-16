# Was a one day codeing challenge


## install
```
cd ./server \
npm install \
cd ../frontend \
npm install \
```

## run
run npm start in the frontend directory and the server directory

## frontend folder needs a .env file containing:
```REACT_APP_BASE_URL=true```
## server folder needs a .env file containing:
```
DATABASE_URL= mongo url `exaple: mondodb://localhost:27017/BudgetingDB` \
OAUTH_GOOGLE_ID= google oauth id \
OAUTH_GOOGLE_SECRET= google oauth secret \
GOOGLE_REDIRECT_URL=http://localhost:5000/api/auth/google \
SESSION_SECRET= custom session secret \
DEV=true
```
