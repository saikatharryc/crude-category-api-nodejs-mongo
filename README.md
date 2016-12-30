# handy-api
NOTE*******Please head into "Master branch"   the heroku address is here




cant add this methods in `routes/api.js`

it just gives error in update/delete page
`
 /*
 *******************************
 *Location @param get services** 
 *    list in that Location   **
 *******************************
 */
router.get('/super/services/:locationID', function(req, res) {

    var locationId = req.params.locationID;
    hnd.find({ location: locationId }).distinct('name').exec(function(error, services) {
        console.log(services)
        res.send(services);
    })

      });

    router.get('/super/:locationID', function(req, res) {

    var locationId = req.params.locationID;

    hnd.find({ location: locationId }, function(err, docs) {
        console.log(docs)
        res.render(
            'api', {
                title: 'API HERE',

                docs: docs
            });
    });
    });

