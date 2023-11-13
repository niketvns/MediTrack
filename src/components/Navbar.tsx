import {FC} from 'react'
import styles from '../styles/components/navbar.module.css';
import {FiCode} from "react-icons/fi";
import {RxHamburgerMenu} from "react-icons/rx";

type Props = {
    title: string;
}

const Navbar: FC<Props> = ({title}): JSX.Element => {
    return (
        <div className={styles.navbar}>
            <div className={styles.title}>
                <div className={styles.hamburger}>
                    <RxHamburgerMenu />
                </div>
                {title}
            </div>
            <a href='https://github.com/niketvns' className={styles['source-code-link']} target='_blank' rel='noreferrer noopener'>
                <FiCode />
                Code
            </a>
        </div >
    )
}

export default Navbar;