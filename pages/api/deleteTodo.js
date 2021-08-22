import { table, getMinifiedRecords } from './utils/airtable';
import auth0 from './utils/auth0';
import ownsRecord from './middleware/OwnRecord';

export default ownsRecord(async (req, res) => {
	const { id } = req.body;
	const { user } = await auth0.getSession(req);

	if (!id) {
		const msg = 'id must be filled! || DELETE req';
		res.status = 400;
		res.json({ msg });
		throw new Error(msg);
	}

	try {
		const deletedRecords = await table.destroy([id]);
		const deletedRecord = {
			id: deletedRecords[0].id,
			fields: deletedRecords[0].fields,
		};
		res.statusCode = 200;
		res.json(getMinifiedRecords(deletedRecord));
	} catch (err) {
		console.log(err);
		res.statusCode = 500;
		res.json({ msg: 'something went wrong' });
	}
});
