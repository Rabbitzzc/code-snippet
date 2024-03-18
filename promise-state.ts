type PromiseState = 'pending' | 'fulfilled' | 'rejected';

export async function getPromiseState(
	p: Promise<unknown>
): Promise<PromiseState> {
	return await Promise.race([
		Promise.resolve(p).then(
			(): PromiseState => 'fulfilled',
			(): PromiseState => 'rejected'
		),
		Promise.resolve().then((): PromiseState => 'pending'),
	]);
}
