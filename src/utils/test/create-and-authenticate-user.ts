import { FastifyInstance } from 'fastify'
import request from 'supertest'

import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateUser(
	app: FastifyInstance
) {
	await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'johndoe@example.com',
			password_hash: '123456'
		},
	})

	const authResponse = await request(app.server).post('/sessions').send({
		email: 'johndoe@example.com',
		password: '123456',
	})

	const { token } = authResponse.body

	return { token }
}
