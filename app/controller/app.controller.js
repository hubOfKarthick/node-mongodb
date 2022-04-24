const db = require("../models");
const Stories = db.stories;
// Create and Save a new Tutorial
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({ message: "Title cannot be empty!" });
        return;
    }
     if (!req.body.description) {
        res.status(400).send({message: 'Description cannot be empty!'});
        return;
    }

    const story = new Stories({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });

    story
        .save(story)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some Error Occureed while creation'
            });
        })
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title : { $regex: new RegExp(title), $options: 'i' }} :  {};
    Stories.find(condition)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Server Error",
        });
      });
};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Stories.findById(id)
        .then(data => {
           if (!data){
               res.status(400).send({
                   message: `Story with id: ${id} is not found`
               });
           } else {
               res.send(data);
           }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Server Error on find by id'
            });
        });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    if (!req.body){
        res.status(400).send({
            message: 'No field(s) found for update action'
        });
    }
    Stories.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Story with given id: ${id} is not found for update`,
          });
        } else {
          res.send({
            message: "Updated Successfully",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Server error while updating the details for the given ID",
        });
      });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Stories.findByIdAndRemove(id)
        .then(data => {
            if (!data){
                res.status(404).send({
                    message: `Data with given id:${id} is not found for deletion`
                });
            }
            else {
                res.send({
                    message: 'Data deleted successfully'
                });
            }
        }).catch(err => {
             res.status(500).send({
               message: err.message || ("Server Error on deleting data with id: " + id),
             });
        });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Stories.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} data(s) deleted successfully`
            });
        })
        .catch(err => {
             res.status(500).send({
               message: err.message || "Server Error on delete all",
             });
        });
};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Stories.findOne({published: true})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
             res.status(500).send({
               message:  "Server Error on finding published stories",
             });
        })
};
