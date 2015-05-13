default: watch

watch:
	node-supervisor app.js

debug:
	node-debug app.js

push:
	git push
	git push heroku master

set_origin:
	heroku git:remote -a react-addons-backend