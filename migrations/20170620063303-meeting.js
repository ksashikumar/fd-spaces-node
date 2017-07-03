'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('rooms_db', {
    id: { type: 'int', primaryKey: true },
    roomname: 'string',
    roomname1: 'string',
    status: 'int',
    sensor: 'int',
    calendar: 'int'
  });
};

exports.down = function(db) {
	return db.dropTable('rooms_db');
};

exports._meta = {
  "version": 1
};
