import { idArg, mutationType, stringArg, intArg } from 'nexus'

export const Mutation = mutationType({
	name: 'Mutation',
	definition(t) {

		// t.crud.createOneClient();
		// t.crud.updateOneClient();
		// t.crud.deleteOneClient();
		
	
		t.field('createClient', {
			type: 'Client',
			args: {
				name: stringArg({ nullable: false }),
				content: stringArg(),
				phone: stringArg(),
				interestLevel: stringArg({ nullable: false })
			},
			resolve: (parent, { name, content, phone, interestLevel }, ctx) => {
				return ctx.prisma.product.create({
					data: {
						name,
						content,
						phone,
						interestLevel,
					},
				});
			},
		});
	}
})