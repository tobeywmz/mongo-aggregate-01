const express = require('express');
const cookieParser = require('cookie-parser');

// Connect to database
require('./db/connect');

// Import routers
const UserRouter = require('./routers/user');
const ResumeRouter = require('./routers/resume');
const CommentRouter = require('./routers/comment');
const StatisticsRouter = require('./routers/statistics');

// Create an express app
const app = express();

// Config the app
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Inject routers
app.use('/user', UserRouter);
app.use('/resume', ResumeRouter);
app.use('/comment', CommentRouter);
app.use('/statistics', StatisticsRouter);

// Make server up and running
app.listen(3000, function() {
    console.log('listening on port 3000');
});