db.createUser({
  user: 'builder',
  pwd: 'builder',
  roles: [
    {
      role: 'readWrite',
      db: 'apidb',
    },
  ],
});

let error = true;

let res = [
  db.client.drop(),
  db.client.createIndex({ name: 1 }),
  db.client.insert({ name: 'David Jeremias' }),
];

printjson(res);

if (error) {
  print('Error, exiting');
  quit(1);
}
