import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prismaClient = new PrismaClient();

const all_clients = fs.readFileSync("prisma/seeders/clientSeeder.json");

function loadClients() {
  const clientParse= JSON.parse(all_clients);
  const allClients = clientParse.dummyclients; //name of data in seeder file
  return allClients.map(clnt => {
    return {
      data: {
        name: clnt.name,
        status: clnt.status,
        address: clnt.address,
        phone: clnt.phone,
        interestLevel: clnt.interestLevel
      }
    };
  });
}

async function main() {
  try {
    const allClients = loadClients();
    for (let clnt of allClients) {
      // console.log(clnt); //clearly there
      // console.log(prismaClient.client); //undefined
      console.log(prismaClient); //undefined
      await prismaClient.clnt.create(clnt)
        .catch(err => console.log(`Error trying to import clients: ${err} client: ${clnt}`));
    }
  } catch (err) {
    console.log(err);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prismaClient.disconnect();
  });
