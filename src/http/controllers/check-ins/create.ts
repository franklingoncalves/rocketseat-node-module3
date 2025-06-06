import { makeCheckInUseCase } from '@/use-case/factories/make-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createCheckInParamsSchema = z.object({
		gymId: z.string().uuid(),
	})

	const createCheckInBodySchema = z.object({
		latitude: z.number().refine((value) => {
			return Math.abs(value) <= 90
		}),
		longitude: z.number().refine((value) => {
			return Math.abs(value) <= 180
		}),
	})

	const { gymId } = createCheckInParamsSchema.parse(request.params)
	const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

	const registerUseCase = makeCheckInUseCase()

	await registerUseCase.execute({
		gymId,
		userId: request.user.sub,
		userLatitude: latitude,
		userLongitude: longitude,
	})

	reply.status(201).send()
}