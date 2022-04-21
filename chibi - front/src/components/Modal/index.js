import './modal.scss';
import useModal from "../../hooks/useModal";
import Button from '../Button';

export default function Modal({ component, title }) {
    const { isShowing, toggle } = useModal();

    return (
        <>
            {(component) &&
                <>
                    <Button handleClick={toggle}>{title}</Button>
                    {isShowing && 
                        <div className="modal-overlay">
                        <div className="modal-wrapper">
                            <div className="modal">
                            <div className="modal-header">
                                <h4>{title}</h4>
                                <button
                                    type="button"
                                    className="modal-close-button"
                                    onClick={toggle}
                                >
                                <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-flex">
                                { component }
                            </div>
                            </div>
                        </div>
                        </div>
                    }
                </>
            }
        </>
    )
}
