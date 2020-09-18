exports.seed = function (knex) {

  const testUsers = [
    {
      id: 1,
      username: "poncho1",
      password: "ponchosPassword"
    },
    {
      id: 2,
      username: "poncho2",
      password: "ponchosPasswordAgain"
    },
  ];

  return knex("testUsers")
    .insert(testUsers)
    .then(() => console.log("\n== Seed data for users table added. ==\n"));
};
