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

            console.log(url)

            home = JSON.parse(await readFile('homes/' + url + '.json'));
            const rows = home.data.rows;
            const columns = home.data.columns;
            var table_content = '<center><table>';
            for (var i = 0; i <= rows - 1; i++) {
                table_content += '<tr>';
                for (var j = 0; j <= columns - 1; j++) {
                    table_content += '<td>';
                    table_content += '<a class="a" href="' + home.content[i][j].url + '"><center><div class="div">';
                    if (home.content[i][j].image !== "") {
                        if (home.content[i][j].image.slice(0, 5) == "TEXT:") {
                            table_content += '<div class="img_text">'
                            table_content += home.content[i][j].image.slice(5, home.content[i][j].image.lenght);
                            table_content += '</div>'
                        } 
                        else {
                            table_content += '<img class="img" src="assets/'
                            table_content += home.content[i][j].image;
                            table_content += '">'
                        }
                    }
                    table_content += '</div><p class="p">' + home.content[i][j].name + '</p></center></a>';
                    table_content += '</td>';
                }
                table_content += '</tr>';
            }
            table_content += '<table></center>';

            res.render('index', {table: table_content});
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