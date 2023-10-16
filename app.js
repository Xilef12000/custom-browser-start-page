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
const ejs = ['', '/', '/index', '/test'];

app.get('*', async (req, res) => {
    try {
        var url = req.originalUrl.split('?')[0];
        //console.log(url);
        if (ejs.includes(url) || ejs.includes(url.split('/')[1])) {
            if (url == '/' || url == '') {
                url = 'default';
            }
            
            //console.log(url)
            
            home = JSON.parse(await readFile('homes/' + url + '.json'));
            var table = '<center><table>';
            for (var i = 0; i <= home.content.length - 1; i++) {
                table += '<tr>';
                for (var j = 0; j <= home.content[i].length - 1; j++) {
                    table += '<td>';
                    table += '<a class="a" href="' + home.content[i][j].url + '"><center><div class="div">';
                    if (home.content[i][j].image !== "") {
                        if (home.content[i][j].image.slice(0, 5) == "TEXT:") {
                            table += '<div class="img_text">'
                            table += home.content[i][j].image.slice(5, home.content[i][j].image.lenght);
                            table += '</div>'
                        } 
                        else {
                            table += '<img class="img" src="assets/'
                            table += home.content[i][j].image;
                            table += '">'
                        }
                    }
                    table += '</div><p class="p">' + home.content[i][j].name + '</p></center></a>';
                    table += '</td>';
                }
                table += '</tr>';
            }
            table += '<table></center>';
            
            var logo;
            if (home.settings.logo == true){
                logo = '<div id="logo" style="text-align: right;"><a href="https://xilef12000.com/"><img src="assets/logo_dark.svg" height="60px"></a></div>'
            }
            const color = home.settings.color
            res.render('index', {table, logo, color});
        }
        else if (assets.includes(url.split('/')[1]) && existsSync('.' + url)){
            //console.log(url);
            if (mime.getType(url.split('.').at(-1)).split('/')[0] == 'text') {
                res.contentType(mime.getType(url.split('.').at(-1))).send( await readFile('.' + url, 'utf8') );
            }
            else {
                res.contentType(mime.getType(url.split('.').at(-1))).send( await readFile('.' + url) );
            }
        }
        else {
            //res.status(404).render('404');
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(await readFile('views/404.html'));
        }
    }
    catch (e) {
        console.error(e);
        res.status(500);
    };
});

app.listen(process.env.PORT || 3000, () => console.log(`App available on http://localhost:3000`))