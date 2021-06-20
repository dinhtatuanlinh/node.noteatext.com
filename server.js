var http = require('http');
var fs = require('fs');

var querystring = require('query-string'); // hàm xử lý chuỗi url
var mongodb = require('mongodb');
var formidable = require('formidable'); // module này để lấy thông tin từ form
var ObjectId = require('mongodb').ObjectID;
var MongoClient = mongodb.MongoClient;

var database = require('./libs/database');

var Port = normalizePort(process.env.PORT || 1000);
var db = 'admin';
// var db = 'phuc';
var companiesCollection = 'companies';
var paticipantCollection = 'clients';
var sessionCollection = 'session';
var usersCollection = 'users';
var calendarCollection = 'calendar';
var args;

var Dich_vu = http.createServer(async function(req, res) {
    var url1 = req.url.replace('/', '');
    var order = querystring.parse(url1);
    console.log(req.url);
    var receivedString = "";
    if (req.url === '/updatesession') {
        var companydata = await database.getlist(companiesCollection, db, args);
        console.log(companydata);
        res.end(companydata);
        return;
    }
    req.on('data', (chunk) => { receivedString += chunk; }); // nhận dữ liệu từ client gửi lên
    // console.log(receivedString);
    //Nếu request là uplooad và method là post
    req.on('end', async() => {
        res.end('app is working');
    })

});
Dich_vu.listen(Port, console.log(`Dịch vụ Dữ liệu đang thực thi tại địa chỉ: http://localhost:${Port}`));
Dich_vu.on('error', onError);
Dich_vu.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof Port === 'string' ?
        'Pipe ' + Port :
        'Port ' + Port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = Dich_vu.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    console.log('Listening on ' + bind);
}