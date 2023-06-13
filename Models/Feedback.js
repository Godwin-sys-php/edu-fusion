const Base = require('./Base');

class Feedback extends Base {
  constructor() {
    super();
  }

  insertOne(toInsert) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        'INSERT INTO feedback SET ?', toInsert,
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  findOne(params) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        'SELECT * FROM feedback WHERE ?', params,
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        'SELECT * FROM feedback',
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
  
  updateOne(toSet, params) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        "UPDATE feedback SET ? WHERE ?", [toSet, params],
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  deleteOne(params) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        "DELETE FROM feedback WHERE ?", params,
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }

  customQuery(query, params) {
    return new Promise((resolve, reject) => {
      this.bdd.query(
        query, params,
        (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
}

module.exports = new Feedback();