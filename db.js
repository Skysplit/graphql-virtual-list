const { range, random } = require('lodash');
const { company, address } = require('faker');

module.exports = {
  properties: range(200_000).map((i) => ({
    id: i + 1,
    ownerName: company.companyName(),
    address: `${address.zipCode()} ${address.city()}`,
    units: random(5, 50),
    score: random(10, 90),
    convRent: random(1000, 2500),
    rentPerMo: random(900, 2000),
  }))
}
