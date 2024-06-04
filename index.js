'use strict'

// Import required modules
const express = require('express')
const path = require('path')
const fs = require('fs')

// Create an Express application
const app = express()

const imagesFolder = path.join(__dirname, 'public', 'images', 'gallery')

// Set EJS as the view engine
app.set('view engine', 'ejs')

// Set the directory for views
app.set('views', path.join(__dirname, 'views'))

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')))

// Define routes
app.get('/', (req, res) => {
	// Render home.html using EJS
	res.render('home')
})

app.get('/class', (req, res) => {
	fs.readFile(path.join(__dirname, 'names.txt'), 'utf8', (err, data) => {
		if (err) {
			console.error(err)
			res.status(500).send('Internal Server Error')
			return
		}
		const names = data.split('\n').map(line => line.trim())
		res.render('class', { names })
	})
})

app.get('/teacher', (req, res) => {
	// Render about.html using EJS
	res.render('teacher')
})

app.get('/gallery', (req, res) => {
	fs.readdir(imagesFolder, (err, files) => {
		if (err) {
			console.error(err)
			return res.status(500).send('Internal Server Error')
		}

		// Передача файлов в шаблон Gallery.ejs
		res.render('gallery', { images: files })
	})
})

app.get('/login', (req, res) => {
	// Render about.html using EJS
	res.render('login')
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
