import { table, getMinifiedRecords } from './utils/airtable';
import auth0 from './utils/auth0';
import ownsRecord from './middleware/OwnRecord';

export default ownsRecord(async (req, res) => {
	const { id, fields } = req.body;
	const { user } = await auth0.getSession(req);

	if (!id || !fields) {
		const msg = 'id or fields must be filled!';
		res.status = 400;
		res.json({ msg });
		throw new Error(msg);
	}

	try {
		const updatedRecords = await table.update([{ id, fields }]);
		const updatedRecord = {
			id: updatedRecords[0].id,
			fields: updatedRecords[0].fields,
		};
		res.statusCode = 200;
		res.json(getMinifiedRecords(updatedRecord));
	} catch (err) {
		console.log(err);
		res.statusCode = 500;
		res.json({ msg: 'something went wrong' });
	}
});
