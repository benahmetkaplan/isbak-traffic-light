function Light(props) {
    const className = props.className;
    const title = props.title;
    return (
        <div className="col-md-4 d-flex flex-column text-center">
            <div className={`traffic-light shape ${className}`}>
                <div className="shadow"></div>
                <div className="light red"></div>
                <div className="light yellow"></div>
                <div className="light green"></div>
            </div>
            <span className="mt-2">{title}</span>
        </div>
    );
}

export default Light;