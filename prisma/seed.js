import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prismaClient = new PrismaClient();

const all_clients = fs.readFileSync("prisma/seeders/clientSeeder.json");

function loadClients() {
  const clientParse= JSON.parse(all_clients);
  const allClients = clientParse.dummyclients;
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
      await prismaClient.product.create(clnt)
        .catch(err => console.log(`Error trying to import clients: ${err} client: ${clnt}`));
    }
  } catch (err) {
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prismaClient.disconnect();
  });
