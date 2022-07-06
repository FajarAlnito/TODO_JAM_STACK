import { table, minifyRecords } from './utils/airtable';
import auth0 from './utils/auth0';

export default auth0.requireAuthentication(async (req, res) => {
	const { user } = await auth0.getSession(req);

	try {
		const records = await table.select({
			filterByFormula: `userId = '${user}'`,
		});
		const minifiedRecord = minifyRecords(records);
		res.statusCode = 200;

		res.json(minifiedRecord);
	} catch (err) {
		res.statusCode = 500;
		res.json({ msg: 'something went wrong!' });
	}
});
