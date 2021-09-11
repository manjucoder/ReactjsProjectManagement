function InputField(props) {
  return (
    <>
      <div class="mb-4">
        <div class="row g-4 align-items-center">
          <div className="col-3">
            <label for="inputPassword6" class="col-form-label ">
              {props.label}
            </label>
          </div>
          <div class="col">
            <input
              type={props.type ? props.type : "text"}
              className="form-control input-style"
              aria-describedby="passwordHelpInline"
              placeholder={`Enter ${props.label}`}
              onChange={props.onChange}
              name={props.name}
              value={props.value}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default InputField;
