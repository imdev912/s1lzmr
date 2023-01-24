import { Bucket } from "./bucketSlice";
import { InputField } from "../InputField";
import { nanoid } from "nanoid";

type Props = {
	buckets: Array<Bucket> | [];
	handleInputChange: Function;
};

const BucketView = (props: Props) => {
	const { buckets, handleInputChange } = props;

	return (
		<>
			{buckets.length > 0 &&
				buckets.map((item: Bucket) => {
					return (
						<InputField
              key={`bucket-${item.name}-volume`}
							name={`bucket-${item.name}-volume`}
							value={item.volume}
							placeholder="add volume of bucket"
							handleInputChange={handleInputChange}
              step="0.1"
              metric="cubic inches"
						/>
					);
				})}
		</>
	);
};

export { BucketView };
