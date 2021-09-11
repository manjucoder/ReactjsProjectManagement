function RadioButton(props) {
  return (
    <>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name={props.name}
          id="flexRadioDefault1"
          onChange={props.onChange}
          value={props.label}
        />
        <label class="form-check-label" for="flexRadioDefault1">
          {props.label}
        </label>
      </div>
    </>
  );
}

export default RadioButton;
