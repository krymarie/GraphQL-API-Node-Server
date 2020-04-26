import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prismaClient = new PrismaClient();

const dummyclients = fs.readFileSync("prisma/seeders/clientSeeder.json");

function loadClients() {
  const clientParse = JSON.parse(dummyclients);
  const allClients = clientParse.data;
  return allClients.map(clnt => {
    return {
      data: {
        name: clnt.name,
        content: clnt.content,
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
      console.log(clnt);
      await prismaClient.client
        .create(clnt)
        .catch(err =>
          console.log(`Error trying to import clients: ${err} client: ${clnt}`)
        );
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
