import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prismaClient = new PrismaClient();

const all_clients = fs.readFileSync("prisma/seeders/clientSeeder.json");

function loadClients() {
  const client = JSON.parse(all_clients);
  const allClients = client.client;
  return allClients.map(client => {
    return {
      data: {
        name: client.name,
        status: client.status,
        address: client.address,
        phone: client.phone,
        interestLevel: client.interestLevel
      }
    };
  });
}

async function main() {
  try {
    const allClients = loadClients();
    for (let clnt of allClients) {
      console.log(clnt);
      await prismaClient.client.create(clnt)
        .catch(err => console.log(`Error trying to full default clients: ${err} client: ${clnt.data}`));
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
