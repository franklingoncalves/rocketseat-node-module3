import { makeSearchGymUseCaseUseCase } from '@/use-case/factories/make-search-gym-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
	const searchGymQuerySchema = z.object({
		q: z.string(),
		page: z.coerce.number().min(1).default(1),
	})

	const { q, page } = searchGymQuerySchema.parse(request.query)

	const searchGymUseCase = makeSearchGymUseCaseUseCase()

	const { gyms } = await searchGymUseCase.execute({
		query: q,
        page,		
	})

	reply.status(200).send({
		gyms,
	})
}