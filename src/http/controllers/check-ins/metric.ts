import { makeGetUserMetricsUseCase } from '@/use-case/factories/make-get-use-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
	const getUserMetricsUseCase = makeGetUserMetricsUseCase()

	const { checkInsCount } = await getUserMetricsUseCase.execute({
		userId: request.user.sub,
	})

	reply.status(200).send({
		checkInsCount,
	})
}