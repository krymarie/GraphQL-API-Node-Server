import { idArg, mutationType, stringArg, intArg } from 'nexus'

export const Mutation = mutationType({
	name: 'Mutation',
	definition(t) {

		t.crud.createOneClient();
		t.crud.updateOneClient();
		t.crud.deleteOneClient();
		
	
		t.field('createClient', {
			type: 'Client',
			args: {
				name: stringArg({ nullable: false }),
				status: stringArg(),
				address: stringArg(),
				phone: stringArg(),
				interestLevel: stringArg({ nullable: false })
			},
			resolve: (parent, { name, status, address, phone, interestLevel }, ctx) => {
				return ctx.prisma.product.create({
					data: {
						name,
						status,
						address,
						phone,
						interestLevel,
					},
				});
			},
		});
	}
})