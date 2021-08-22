import Airtable from 'airtable';

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;
const tableName = process.env.AIRTABLE_TABLE_NAME;

const base = new Airtable({ apiKey }).base(baseId);

const table = base(tableName);

const getMinifiedRecords = (record) => {
	if (!record.fields.completed) {
		record.fields.completed = false;
	}
	return {
		id: record.id,
		fields: record.fields,
	};
};

const minifyRecords = (records) => {
	return records.map((record) => getMinifiedRecords(record));
};

export { table, getMinifiedRecords, minifyRecords };
