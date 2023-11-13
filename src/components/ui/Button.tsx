import {FC, ReactNode} from 'react'
import styles from '../../styles/components/ui/button.module.css'

type Props = {
    children: ReactNode,
    onClick: any
}

const Button: FC<Props> = ({children, ...args}) => {
    return (
        <button className={styles['custom-button']} {...args}>
            {children}
        </button>
    )
}

export default Button;