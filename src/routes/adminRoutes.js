const express = require("express");
const { MongoClient } = require("mongodb");
// const sql = require("mssql");
const debug = require("debug")("app:adminRoutes");
const books = require("../../bookAPI");

const adminRouter = express.Router();

const router = () => {
  adminRouter.route("/").get((req, res) => {
    const url = "mongodb://localhost:27017";
    const dbName = "libraryApp";

    async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug("Connected to the Server");

        const db = client.db(dbName);

        const response = await db.collection("books").insertMany(books);
        res.json(response);
      } catch (err) {
        debug(err.stack);
      }

      client.close();
    }
    mongo();
  });

  // adminRouter
  //   .route("/:id")
  //   .all((req, res, next) => {
  //     async function bookQuery() {
  //       const { id } = req.params;
  //       const request = new sql.Request();
  //       const { recordset } = await request
  //         .input("id", sql.Int, id)
  //         .query("select * from books where id = @id");
  //       [req.book] = recordset;
  //       next();
  //     }
  //     bookQuery();
  //   })
  //   .get((req, res) => {
  //     res.render("bookView", {
  //       title: "Library",
  //       nav,
  //       book: req.book,
  //     });
  //   });

  return adminRouter;
};

module.exports = router;
