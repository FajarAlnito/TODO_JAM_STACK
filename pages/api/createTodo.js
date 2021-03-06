import { table } from './utils/airtable';
import auth0 from './utils/auth0';

export default auth0.requireAuthentication(async (req, res) => {
	const { description } = req.body;
	const { user } = await auth0.getSession(req);

	if (!description) {
		const msg = 'description must be filled!';
		res.status = 400;
		res.json({ msg });
		throw new Error(msg);
	}

	try {
		const createdRecords = await table.create([
			{ fields: { description, userId: user.sub } },
		]);
		const createdRecord = {
			id: createdRecords[0].id,
			fields: createdRecords[0].fields,
		};
		res.statusCode = 200;
		res.json(createdRecord);
	} catch (err) {
		console.log(err);
		res.statusCode = 500;
		res.json({ msg: 'something went wrong' });
	}
});
