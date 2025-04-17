// import { Repository } from "./repository";
//import { SqlRepository } from "./sql_repository";
import { ApiRepository } from "./repository";
import { OrmRepository } from "./orm_repository";

//const repository: Repository = new SqlRepository();
// const repository: Repository = new OrmRepository();
const repository: ApiRepository = new OrmRepository();
export default repository;
