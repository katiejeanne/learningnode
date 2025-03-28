import { readFileSync } from "fs";
import { Database } from "sqlite3";
import { Repository, Result } from "./repository";
import {
  queryAllSql,
  queryByNameSql,
  insertPerson,
  insertCalculation,
  insertResult,
} from "./sql_queries";
import { TransactionHelper } from "./sql_helpers";

export class SqlRepository implements Repository {
  db: Database;

  constructor() {
    this.db = new Database("age.db");
    this.db.exec(readFileSync("age.sql").toString(), (err) => {
      if (err != undefined) throw err;
    });
    this.db.on("trace", (query) => {
      console.log("Executing SQL:", query);
    });
  }

  async saveResult(r: Result): Promise<number> {
    try {
      return await new TransactionHelper()
        .add(insertPerson, { $name: r.name })
        .add(insertCalculation, {
          $age: r.age,
          $years: r.years,
          $nextage: r.nextage,
        })
        .add(insertResult, {
          $name: r.name,
          $age: r.age,
          $years: r.years,
          $nextage: r.nextage,
        })
        .run(this.db);
    } catch (error) {
      console.log("Save Result Error", error);
      throw error;
    }
  }

  getAllResults($limit: number): Promise<Result[]> {
    return this.executeQuery(queryAllSql, { $limit });
  }

  getResultsByName($name: string, $limit: number): Promise<Result[]> {
    // return this.executeQuery(
    //   `
    //     SELECT Results.*, name, age, years, nextage FROM Results
    //     INNER JOIN People ON personId = People.id
    //     INNER JOIN Calculations ON calculationId = Calculations.id
    //     WHERE name = "${$name}"`,
    //   {}
    // );
    return this.executeQuery(queryByNameSql, { $name, $limit });
  }

  executeQuery(sql: string, params: any): Promise<Result[]> {
    return new Promise<Result[]>((resolve, reject) => {
      this.db.all<Result>(sql, params, (err, rows) => {
        if (err) {
          console.error("SQL Error Details:", err);
          reject(err);
        } else if (!rows || rows.length === 0) {
          console.warn("Query returned no results.");
          resolve([]);
        } else {
          console.log("Query Results:", rows);
          resolve(rows);
        }
      });
    });
  }
}
