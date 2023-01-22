type Props = {
	count: number;
	handleInputChange: Function;
};

const BucketCount = (props: Props) => {
	const { count, handleInputChange } = props;

	return (
		<div className="input-group border rounded-3 mb-4">
			<span className="input-group-text border-0">bucket count</span>

			<input
				type="number"
				name="bucket-count"
				className="form-control border-0"
				placeholder="number of buckets"
				value={count > 0 ? count : ""}
				max="5"
				onChange={(event) => handleInputChange(event)}
			/>
		</div>
	);
};

export { BucketCount };
