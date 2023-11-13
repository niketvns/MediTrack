import {FC, ReactNode} from 'react';
import styles from '../styles/components/bodywrapper.module.css'

type Props = {
    children: ReactNode
}

const BodyWrapper: FC<Props> = ({children}): JSX.Element => {
    return (
        <div className={styles.body_wrapper}>
            {children}
        </div>
    )
}

export default BodyWrapper;