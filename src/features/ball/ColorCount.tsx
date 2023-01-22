type Props = {
	count: number;
	handleInputChange: Function;
};

const ColorCount = (props: Props) => {
	const { count, handleInputChange } = props;

	return (
		<>
			<h2>Number of ball colors:</h2>

			<div className="input-group border rounded-3 mb-4">
				<span className="input-group-text border-0">color count</span>

				<input
					type="number"
					name="color-count"
					className="form-control border-0"
					placeholder="number of ball colors"
					value={count > 0 ? count : ""}
					max="5"
					onChange={(event) => handleInputChange(event)}
				/>
			</div>
		</>
	);
};

export { ColorCount };
