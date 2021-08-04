var xlsx = require('read-excel-file');
module.exports = {
    index: function (req, res) {
        // Process Vehicle

        const xlsxFile = require('read-excel-file/node');
        xlsxFile('./uploads/Vehicle.xlsx').then((rows) => {
            for (let i = 0; i < rows.length; i++) {
                //const data = [];
                for (let j = 0; j < rows[i].length; j++) {
                    data = rows[i][j];
                }
                console.log(data);
                //console.log("-----------");
            };
            /*
            rows.forEach((col) => {
                col.forEach((data) => {
                    console.log(data);
                })
            });
            */
            res.json({
                message: "OK"
            });
        }).catch(error => {
            res.status(500).json({
                message: "Something went worng",
                error: error
            })
        });


        /*
        const workSheetsFromFile = xlsx.parse(`${__dirname}/../uploads/Vehicle.xlsx`);
        res.json(workSheetsFromFile.length());
        res.json({
            message: "OK - process xlsx",
            vehicles: workSheetsFromFile[0]['data'][0]
        });
        */
    }
}