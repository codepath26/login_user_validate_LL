import classes from './Input.module.css'
const Input = ({isValid,type,id,onChange,onBlur,value,label})=>{
return (
  <div
  className={`${classes.control} ${
    isValid === false ? classes.invalid : ""
  }`}
>
  <label htmlFor="email">{label}</label>
  <input
    type={type}
    id={id}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
  />
</div>
)
}
export default Input;