import {FC, ReactNode} from 'react'
import styles from '../styles/components/modelwrapper.module.css';

type Props = {
    children: ReactNode
}

const ModelWrapper: FC<Props> = ({children}) => {
    return (
        <div className={styles.model}>
            {children}
        </div>
    )
}

export default ModelWrapper;