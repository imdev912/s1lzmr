import { Bucket } from "./bucket/bucketSlice";

interface Props extends Bucket {
  placeholder: string;
  value?: number;
  handleInputChange: Function;
  step: string
  metric?: string;
}

const InputField = (props: Props) => {
  const { name, value, placeholder, handleInputChange, step, metric } = props;

  return (
    <div className="input-group border rounded-3 mb-3">
      <span className="input-group-text border-0">
        {name.replace(/(-)/g, " ")}
      </span>

      <input
        type="number"
        name={name}
        className="form-control border-0"
        placeholder={placeholder}
        value={value}
        onChange={(event) => handleInputChange(event)}
        step={step}
      />

      {metric && (
        <span className="input-group-text border-0">{metric}</span>
      )}
    </div>
  );
};

export { InputField };
