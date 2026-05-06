function adjustDate(date: string) {
	const dateParse = Date.parse(date);

	const getDate = new Date(dateParse).toISOString().slice(0, 10);

	const getTime = new Date(dateParse).toLocaleTimeString();

	const finalDate = `${getDate} ${getTime}`;

	return finalDate;
}

export default adjustDate;
