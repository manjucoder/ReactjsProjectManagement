export default function SubmitButton(props) {
  return (
    <>
      <button
        type="button"
        class={`btn ${props.color ? props.color : "btn-primary"}`}
        onClick={props.onClick}
      >
        {props.value}
      </button>
    </>
  );
}
