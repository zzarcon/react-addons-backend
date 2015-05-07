default: watch

watch: 
	node-supervisor app.js

debug: 
	node-debug app.js