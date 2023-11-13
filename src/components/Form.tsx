import {FC, ReactNode, FormEvent, Dispatch, SetStateAction} from 'react'
import styles from '../styles/components/form.module.css';
import {AiOutlineClose} from 'react-icons/ai';

type Props = {
    children: ReactNode,
    setIsFormModel: Dispatch<SetStateAction<boolean>>
}

const Form: FC<Props> = ({children, setIsFormModel}) => {

    const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <form className={styles.form} onSubmit={formSubmitHandler}>
            <div className={styles.close} onClick={() => setIsFormModel(prev => !prev)}>
                <AiOutlineClose />
            </div>
            {children}
        </form>
    )
}

export default Form;