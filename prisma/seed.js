import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prismaClient = new PrismaClient();

const defaultClients = fs.readFileSync("prisma/seeders/clientSeeder.json");

function loadClients() {
  const client = JSON.parse(defaultClients);
  const allClients = client.defaultClients;
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
    const allClients = loadVehicles();
    for (let client of allClients) {
      await prismaClient.client
        .create(client)
        .catch(err =>
          console.log(
            `Error trying to full default clients: ${err} client: ${client}`
          )
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
