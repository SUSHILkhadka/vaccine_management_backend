import Knex from 'knex';
import knexConfig from './knexfile';
// @ts-ignore
import knexStringCase from "knex-stringcase";

const knex = Knex(knexStringCase(knexConfig[`${process.env.NODE_ENV}`]));
export default knex;
