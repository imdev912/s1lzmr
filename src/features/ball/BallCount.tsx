import { Ball } from "./ballSlice";
import { InputField } from "../InputField";

type Props = {
	balls: Array<Ball> | [];
	handleInputChange: Function;
};

const BallCount = (props: Props) => {
	const { balls, handleInputChange } = props;

	return (
		<>
			{balls.length > 0 &&
				balls.map((item: Ball) => {
					return (
						<InputField
              key={`ball-${item.color}-count`}
							name={`ball-${item.color}-count`}
							value={item.count}
							placeholder="number of ball in bucket"
							handleInputChange={handleInputChange}
						/>
					);
				})}
		</>
	);
};

export { BallCount };
