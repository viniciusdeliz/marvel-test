import { FieldValues, FieldErrors } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

interface InputValidationAlertProps {
  errors: FieldErrors<FieldValues>,
  inputName: string,
}

export default function InputValidatorAlert(props: InputValidationAlertProps) {
  console.log('received props is...', props);
  const errors = props.errors;
  const name = props.inputName;
  
  return <>
    <style jsx>{`

    `}</style>
    <div className='validator-div h-5 overflow-hidden'>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ messages }) => {
        return messages
          ? Object.entries(messages).map(([type, message]) => (
            <p key={type} className="text-orange-600 text-[.6875rem] before:inline before:content-['⚠'] before:mx-0.5">{message}</p>
          )) : null;
        }} />
    </div>
  </>
}