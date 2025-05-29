import './css/popup.css';

export function DialogPopup({
        open,
        setOpen,
        setOutput, 
        message='Close this popup?',
        option1='Yes',
        option1Value=0,
        option2 = 'No',
        option2Value=1 
    }) {

    var style = {
        visibility: 'hidden'
    };

    if (open) {
        style = {
            visibility: 'visible'
        };
    } else {
        style = {
            visibility: 'hidden',
        };
    }

    return (
        <div className="popup" style={style}>
            <div className='popup-content' style={style}>
                <span className='popup-message'>{message}</span>
                <br />
                <div className="popup-options">
                    <button onClick={() => {
                        setOutput(option1Value);
                        setOpen(false);
                        }}> {option1} </button>
                    <button onClick={() => {
                        setOutput(option2Value);
                        setOpen(false);
                        }}> {option2} </button>
                </div>
            </div>
        </div>
    )
}