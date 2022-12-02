# A one day codeing challenge im probs gonna upday over the comming weeks

## run 
cd ./server &&npm install 
cd ../ && npm install
and run npm start in the main directory and the server directory

## main folder needs a .env file containing:
REACT_APP_BASE_URL=true
## server folder needs a .env file containing:
DATABASE_URL= mongo url\
OAUTH_GOOGLE_ID= google oauth id\
OAUTH_GOOGLE_SECRET= google oauth secret\
GOOGLE_REDIRECT_URL=http://localhost:5000/api/auth/google \
SESSION_SECRET= custom session secret\
DEV=true