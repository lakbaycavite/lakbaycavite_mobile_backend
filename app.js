const express = require ('express');
const body_parser = require ('body-parser');
const postRoutes = require('./routers/postRouter');
const eventRoute = require('./routers/eventRoute');
const authRoutes = require('./routers/authRoutes');
const userRoutes = require('./routers/userRoutes');
const bookRoutes = require('./routers/bookmarkRoutes');
const directionsRoute = require('./routers/directionsRoutes')

const app = express();

app.use(body_parser.json());

app.use('/posts', postRoutes);

app.use('/bookmark', bookRoutes)

app.use('/event', eventRoute);

app.use('directions', directionsRoute);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

module.exports = app;