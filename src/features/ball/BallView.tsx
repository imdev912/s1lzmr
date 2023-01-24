import { Ball } from "./ballSlice";
import { InputField } from "../InputField";

type Props = {
	balls: Array<Ball> | [];
	handleInputChange: Function;
};

const BallView = (props: Props) => {
	const { balls, handleInputChange } = props;

	return (
		<>
			{balls.length > 0 && <h2>Add the volume of the balls:</h2>}

			{balls.length > 0 &&
				balls.map((item: Ball) => {
					return (
						<InputField
              key={`ball-${item.color}-volume`}
							name={`ball-${item.color}-volume`}
							value={item.volume}
							placeholder="add volume of ball"
							handleInputChange={handleInputChange}
              step="0.01"
              metric="cubic inches"
						/>
					);
				})}
		</>
	);
};

export { BallView };
