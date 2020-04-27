// import { idArg, mutationType, stringArg, intArg } from '@nexus/schema' // now @nexus/schema nexus is now a framework
import { idArg, mutationType, stringArg, intArg } from "nexus";

export const Mutation = mutationType({
  name: "Mutation",
  definition(t) {
    t.crud.getOneClient();
    t.crud.createOneClient();
    t.crud.updateOneClient();
    t.crud.deleteOneClient();
  }
});
