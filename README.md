# Aller Frontend Test Task
This is a  SPA-application that gives the opportunity to the site’s visitor to suggest some changes for the article.
 
Any Backend Server is not needed. All data is stored in Redux store. Use mock date to simulate server’s GET, POST, DELETE request. All screenshots are only screenshots, you can improve UI if you want.

App Routes(app consists of 2 pages)
0. User page /fb?articleURL={url_parameter}, url_parameter is article URL, so validation is needed here
0. Editor page /fb/results?isApproved=true (where isApproved is not required parameter)
 
Briefly how it works.

The application must have 2 parts(see App Routes)
* User page

The link in the app  /fb?articleURL={url_parameter}, where {url_parameter} - URL of the article
User can see all paragraphs. So user can type all suggestions and press SEND CHANGES.
 
The example of  this page
 
/fb?articleURL=http://dagbladet.no/article/some_article_name

The frontend sends a request to the backend (Server is not needed. Simulate all request with dummy data).
 
 
ex.
 
mockParagraphReqData={
   paragraphs: [
	“It was amazing way. Sun was shining brightly”,
“This is wrong text”,
“etc pharagraph content”,
  ]
}
fetch(‘dummydomain.dev/?articleURL=http://dagbaldet.no/some_article_name’)
.then((resp)=>{
  //request was success.
 //instead of ’resp’ use ‘mockParagraphReqData’, populate Store etc.
})
.catch((e)=>{
//show error to user
})

Frontend (see page screenshot above), receives the paragraphs. Under each paragraph there is a field for the user text input and a button Send changes. By clicking this button, an object is sent to dummy URL
{
articleUrl:”https://dagbladet.no/…..ikken/68573788”,
originalText: “Original articles text”,
usersText:”Text proposed by user”
}
,saved in the Redux store in case of success request and this paragraph is removed from UI.

In case of error - show it to user. Don’t forget to show some loading UI spinner to user.  
 
* Editor page (please see image below) where you can see all suggestions
 
URL: /fb/results
A page with all suggestions where the author of the article can marke the suggestions as approved or delete them.
Each paragraph should contain all suggestions it has:

i.e.
	<<<The Second World War began in 1945. >>>
		User suggestions:
			<<<The Second World War began in 1939.>>> ← you can approve this
			<<<The Second World War began in 1941>>>  ← or this
			<<<The Second World War began yesterday>>> ← or this
			<<<Custom text input>>> ← editor can write his own suggestion

### Page 2
When one of the suggestions are confirmed (Approve button), the paragraph with all suggestions disappear from the page. 

When deleting (Delete button) - deleting all suggestions and paragraph from the Redux store, the paragraph with all suggestions disappears from the page.

If get parameter “showApproved” is set to true →  URL: /fb/results?showApproved=true
Page contains only paragraphs that has approved suggestion. On this page you can re-approve it with another one

While implementation need to be used:
 
```ReactJS```
```Redux```
```SASS(LESS) syntax```
build system: ```Webpack```
any additional libs that you think are applicable here
 
The application should be started with the npm start command. The application must be located in repository. Do not use boilerplates such as React App
 
Leave flow as in description, but you can improve UI if you want. Better UI - better result. Enjoy!

## Run the app

0. ```npm install```
0. ```npm start```

## Build the app
```npm run build```

This will build the app into the "dist" directory in the root of the project. It contains the index.html along with the minified assets, ready for production.