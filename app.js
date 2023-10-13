//https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application
//https://fireship.io/courses/javascript/node-basics/

const express = require('express');
const fs = require ('fs');
const app = express();
app.set('view engine', 'ejs');
const { readFile } = require('fs').promises;
const { existsSync } = require('fs');
const mime = require('mime');


const assets = ['style-sheets', 'scripts', 'assets'];
const ejs = ['', '/', '/index'];

app.get('*', async (req, res) => {
    try {
        var url = req.originalUrl.split('?')[0];
        //console.log(url);
        if (ejs.includes(url) || ejs.includes(url.split('/')[1])) {
            if (url == '/' || url == '') {
                url = 'index';
            }
            //console.log('pages/' + url)
            //res.render('pages/' + url);
            console.log(url)
            res.render(url);
        }
        else if (assets.includes(url.split('/')[1]) && existsSync('.' + url)){
            console.log(url);
            if (mime.getType(url.split('.').at(-1)).split('/')[0] == 'text') {
                res.contentType(mime.getType(url.split('.').at(-1))).send( await readFile('.' + url, 'utf8') );
            }
            else {
                res.contentType(mime.getType(url.split('.').at(-1))).send( await readFile('.' + url) );
            }
        }
        else {
            //res.status(404).render('pages/404');
            res.status(404).render('404');
        }
    }
    catch (e) {
        console.error(e);
        res.status(500);
    };
});

app.listen(process.env.PORT || 3000, () => console.log(`App available on http://localhost:3000`))