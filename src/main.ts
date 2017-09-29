/// <reference path="../types/global.d.ts" />
import Droi from './core';
import * as moment from 'moment';
//const globalAny:any = global;

//globalAny.Droi = Droi
global.Droi = Droi

console.log(moment().toISOString())

module.exports = Droi;