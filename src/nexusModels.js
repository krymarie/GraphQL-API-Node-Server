import { objectType } from "nexus";

const Client = objectType({
  name: "Client",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.content();
    t.model.phone();
    t.model.interestLevel();
    t.model.createdAt();
    t.model.updatedAt();
  }
});

export const Models = [Client];
