function SelectOption(props) {
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
            <select
              class="form-select"
              id="inputGroupSelect01"
              name={props.name}
              onChange={props.onChange}
            >
              <option selected>Choose...</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Developer">Developer</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectOption;
