import { idArg, queryType, stringArg } from "nexus";

export const Query = queryType({
  definition(t) {
    t.field("Client", {
      type: "Client",
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.client.findOne({
          where: {
            id
          }
        });
      }
    });

    t.list.field("Clients", {
      type: "Client",
      args: {
        searchString: stringArg({ nullable: true })
      },
      resolve: (parent, { searchString }, ctx) => {
        return ctx.prisma.client.findMany({
          where: {
            OR: [
              { name: { contains: searchString } },
              { phone: { contains: searchString } }
            ]
          }
        });
      }
    });
  }
});
