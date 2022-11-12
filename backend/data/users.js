import bcrypt from 'bcryptjs'

const users = [
	{
		name: 'Admin User',
		email: 'admin@example.com',
		password: bcypt.hashSync('123456',10),
		isAdmin: true
	},
	{
		name: 'Sajeel Hassan',
		email: 'sajeel@example.com',
		password: bcypt.hashSync('123456',10),
	},
	{
		name: 'Rabia Hussain',
		email: 'rabia@example.com',
		password: bcypt.hashSync('123456',10),
	}
]

export default users