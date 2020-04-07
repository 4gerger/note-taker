// ================================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ================================================================================

var fs = require("fs");
var activeNote = require("../db/db.json")


module.exports = function (app) {

    // API GET Requests
    // Retrieve data from db.json when user "visits" the page

    app.get("/api/notes", function (req, res) {
        res.json(activeNote);
    })

    // API POST Requests
    // When user clicks the "save" icon, the server saves the data to db.json

    app.post("/api/notes", function (req, res) {

        var newNote = req.body;
        id = activeNote.length + 1;
        newNote.id = id.toString();

        activeNote.push(newNote);
        res.json(newNote);

        fs.writeFile("./db/db.json", JSON.stringify(activeNote), function (err) {
            if (err) throw err;
            console.log("Data has been added from database")
        })
    });

    // API DELETE Requests
    // When user clicks the "delete" icon, the note is selected deleted from db.json

    app.delete("/api/notes/:character", function (req, res) {
        var selected = req.params.character;

        for (var i = 0; i < activeNote.length; i++) {
            if (selected === activeNote[i].id) {
                activeNote.splice(i, 1);

                fs.writeFile("./db/db.json", JSON.stringify(activeNote), function (err) {
                    if (err) throw err;
                    console.log("Data has been deleted from database");
                })
                return res.json(activeNote);
            }
        }
        return res.json(false);
    })

}