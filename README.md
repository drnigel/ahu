# New-Project-Template

A simple template to start a new project. Using Bootstrap , SASS and Gulp.


Index.html: 

1) loads current Bootstrap template with BS-CSS BS-JS and Jquery through cdns for rapid developemnt.

2) loads style.min.css as external stylesheet, for custom styles.

3) loads app.js as external script, for custom scripting.

gulpfile.js:

1) compiles SASS into CSS and minifies it.

2) autoprefix all css automatically for all browsers two iterations ago and up 

3)combines and minifies all js in the js folder

4) Browsersync auto refreshes your browser across all your devices whenever you change and save a Sass,CSS,JS,JSON and HTML file.


Browsersync assumes you are running a web server to test locally. Edit the URL in var proxyServer = "http://localhost/u-day" to what ever URL your porject on your local web server.
