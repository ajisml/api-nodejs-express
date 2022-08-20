const express	=	require('express');
const app		=	express();
const port 		=	3000;
const bodyParser= 	require('body-parser');


app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())


const postsRouter 	=	require('./routes/posts');
app.use('/api/posts', postsRouter);




app.listen(port, ()=>{


	console.log(`App Running http://localhost:${port}`);


});