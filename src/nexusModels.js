import { objectType } from 'nexus'

const Client = objectType({
	name: 'Product',
	definition(t) {
		t.model.id()
		t.model.name()
		t.model.status()
		t.model.address()
		t.model.phone()
		t.model.interestLevel()
		t.model.createdAt()
		t.model.updatedAt()
	}
})

export const Models = [
	Client
]